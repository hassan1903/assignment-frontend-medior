import React, { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField
} from "@mui/material"
import { type MRT_ColumnDef } from "material-react-table"
import { type Fruit } from "types/Fruit"
import { type Vegetable } from "types/Vegetable"
import { type Tag } from "types/Tag"

interface AddModalProps {
  columns: MRT_ColumnDef<Fruit>[] | MRT_ColumnDef<Vegetable>[]
  onClose: () => void
  onSubmit: (values: Fruit | Vegetable) => void
  open: boolean
  tags?: Tag[]
}

//example of creating a mui dialog modal for creating new rows
export const AddNewModal = ({ columns, onClose, onSubmit, open, tags }: AddModalProps) => {
  const [values, setValues] = useState<Fruit | Vegetable>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = ""
      return acc
    }, {} as any)
  )
  const handleSubmit = () => {
    onSubmit(values)
    setValues({ description: "", id: "", name: "", tags: [] })
    onClose()
  }

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">{"Add New"}</DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem"
            }}
          >
            {columns.map(column =>
              column.accessorKey !== "id" && column.accessorKey !== "isArchived" ? (
                column.accessorKey === "tags" ? (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    value={values.tags || []}
                    select
                    SelectProps={{ multiple: true }}
                    onChange={e => {
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }}
                  >
                    {tags?.map(tag => {
                      return (
                        <MenuItem key={tag.id} value={tag.id}>
                          {tag.name}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                ) : (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={e => setValues({ ...values, [e.target.name]: e.target.value })}
                  />
                )
              ) : null
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>{"Cancel"}</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          {"Add"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
