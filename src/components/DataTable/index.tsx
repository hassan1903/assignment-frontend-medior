import React, { useCallback, useEffect, useState } from "react"
import { Box, Button, IconButton, Tooltip } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { AddNewModal } from "components/AddNewModal"
import MaterialReactTable, {
  type MRT_ColumnDef,
  type MaterialReactTableProps,
  type MRT_Row
} from "material-react-table"
import { type Fruit } from "types/Fruit"
import { type Vegetable } from "types/Vegetable"
import { type Tag } from "types/Tag"

type DataTableProps = {
  columns: MRT_ColumnDef<Fruit | Vegetable>[]
  onCreate?: (val: Fruit | Vegetable) => void
  onDelete?: (id: string) => void
  onReset?: () => void
  onUpdate?: (val: Fruit | Vegetable) => void
  tableData: Fruit[] | Vegetable[]
  tags?: Tag[]
  validationErrors: {
    [cellId: string]: string
  }
}
export const DataTable = ({
  columns,
  onCreate,
  onDelete,
  onReset,
  onUpdate,
  tableData,
  tags,
  validationErrors
}: DataTableProps) => {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [valErrors, setValErrors] = useState<{
    [cellId: string]: string
  }>(validationErrors)

  useEffect(() => {
    setValErrors(validationErrors)
  }, [validationErrors])

  const handleAddNewRow = (values: Fruit | Vegetable) => {
    onCreate && onCreate(values)
  }

  const handleSaveRowEdits: MaterialReactTableProps<
    Fruit | Vegetable
  >["onEditingRowSave"] = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(valErrors).length) {
      onUpdate && onUpdate(values)
      exitEditingMode() //required to exit editing mode and close modal
    }
  }

  const handleCancelRowEdits = () => {
    setValErrors({})
  }

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Fruit | Vegetable>) => {
      if (!window.confirm(`Are you sure you want to delete '${row.getValue("name")}'`)) {
        return
      }
      onDelete && onDelete(row.getValue("id"))
    },
    [onDelete]
  )

  return (
    <div style={{ padding: "3rem" }}>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center"
            },
            size: 60
          }
        }}
        columns={columns}
        data={tableData}
        editingMode="modal"
        enableColumnOrdering
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableEditing
        enableColumnFilters={false}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <div>
            <Button color="primary" onClick={() => setAddModalOpen(true)} variant="contained">
              {"Add New"}
            </Button>
            <Button
              sx={{ marginLeft: "1.25rem" }}
              color="secondary"
              onClick={() => {
                onReset && onReset()
              }}
              variant="contained"
            >
              {"Reset"}
            </Button>
          </div>
        )}
      />
      <AddNewModal
        columns={columns}
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddNewRow}
        tags={tags}
      />
    </div>
  )
}
