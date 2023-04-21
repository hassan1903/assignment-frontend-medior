import React, { useCallback, useState } from "react"
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
  enablePagination?: boolean
  hideActions?: boolean
  hideTopButtons?: boolean
  onCreate?: (val: Fruit | Vegetable) => void
  onDelete?: (id: string) => void
  onReset?: () => void
  onRowSelected?: (row: Fruit | Vegetable) => void
  onUpdate?: (val: Fruit | Vegetable) => void
  tableData: Fruit[] | Vegetable[]
  tags?: Tag[]
  validationErrors?: {
    [cellId: string]: string
  }
}
export const DataTable = ({
  columns,
  enablePagination,
  hideActions,
  hideTopButtons,
  onCreate,
  onDelete,
  onReset,
  onRowSelected,
  onUpdate,
  tableData,
  tags,
  validationErrors
}: DataTableProps) => {
  const [addModalOpen, setAddModalOpen] = useState(false)

  const handleAddNewRow = (values: Fruit | Vegetable) => {
    onCreate && onCreate(values)
  }

  const handleSaveRowEdits: MaterialReactTableProps<
    Fruit | Vegetable
  >["onEditingRowSave"] = async ({ exitEditingMode, row, values }) => {
    if (validationErrors && Object.keys(validationErrors).length <= 0) {
      onUpdate && onUpdate(values)
      exitEditingMode() //required to exit editing mode and close modal
    }
  }

  const handleRowClick = (row: MRT_Row<Fruit | Vegetable>) => {
    onRowSelected && onRowSelected(row.original)
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
    <>
      <MaterialReactTable
        displayColumnDefOptions={
          hideActions
            ? undefined
            : {
                "mrt-row-actions": {
                  muiTableHeadCellProps: {
                    align: "center"
                  },
                  size: 60
                }
              }
        }
        columns={columns}
        data={tableData}
        editingMode={hideActions ? undefined : "modal"}
        enableColumnOrdering
        enablePagination={enablePagination}
        enableRowActions={!hideActions}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableEditing={!hideActions}
        enableColumnFilters={false}
        globalFilterFn="contains"
        onEditingRowSave={hideActions ? undefined : handleSaveRowEdits}
        // onEditingRowCancel={hideActions ? undefined : handleCancelRowEdits}
        muiTableBodyRowProps={({ row }) => ({
          onClick: onRowSelected ? () => handleRowClick(row) : undefined,
          sx: onRowSelected ? { cursor: "pointer" } : undefined
        })}
        renderRowActions={
          hideActions
            ? undefined
            : ({ row, table }) => (
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
              )
        }
        renderTopToolbarCustomActions={
          hideTopButtons
            ? undefined
            : () => (
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
              )
        }
      />
      {hideTopButtons ? undefined : (
        <AddNewModal
          columns={columns}
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddNewRow}
          tags={tags}
        />
      )}
    </>
  )
}
