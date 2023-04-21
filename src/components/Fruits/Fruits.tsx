import React, { useCallback, useMemo, useState } from "react"
import { Box, Checkbox, MenuItem } from "@mui/material"
import { DataTable } from "components/DataTable"
import { validateRequired } from "components/DataTable/validation"
import {
  useAddFruitMutation,
  useDeleteFruitMutation,
  useGetFruitTagsQuery,
  useGetFruitsQuery,
  useResetFruitMutation,
  useUpdateFruitMutation
} from "app/api"
import { type MRT_Cell, type MRT_ColumnDef, type MRT_Row } from "material-react-table"
import { type Fruit } from "types/Fruit"
import { type Tag } from "types/Tag"

export const Fruits = () => {
  const { data: tags } = useGetFruitTagsQuery()
  const { data: fruits } = useGetFruitsQuery()
  const [resetFruit] = useResetFruitMutation()
  const [addFruit] = useAddFruitMutation()
  const [updateFruit] = useUpdateFruitMutation()
  const [deleteFruit] = useDeleteFruitMutation()
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string
  }>({})

  const getCommonEditTextFieldProps = useCallback(
    (cell: MRT_Cell<Fruit>): MRT_ColumnDef<Fruit>["muiTableBodyCellEditTextFieldProps"] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: event => {
          const isValid = validateRequired(event.target.value)
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`
            })
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id]
            setValidationErrors({
              ...validationErrors
            })
          }
        }
      }
    },
    [validationErrors]
  )

  const columns = useMemo<MRT_ColumnDef<Fruit>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 200
      },
      {
        accessorKey: "name",
        header: "Fruit Name",
        enableColumnOrdering: false,
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: "description",
        header: "Description",
        enableColumnOrdering: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: "tags",
        header: "Tags",
        size: 100,
        enableColumnOrdering: false,
        Cell: ({ renderedCellValue, row }: { renderedCellValue: any; row: MRT_Row<Fruit> }) => {
          return tags
            ? tags.map((tag: Tag) => {
                const filteredTag = renderedCellValue?.filter((item: string) => item === tag.id)
                return (
                  <Box
                    key={tag.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem"
                    }}
                  >
                    <Checkbox checked={filteredTag && filteredTag.length > 0} disabled />
                    {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                    <span>{tag.name}</span>
                  </Box>
                )
              })
            : null
        },
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          select: true,
          SelectProps: { multiple: true, defaultValue: cell.getValue() || [] },
          children: tags?.map(tag => {
            return (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            )
          })
        })
      },
      {
        accessorKey: "isArchived",
        header: "Is Archived?",
        enableColumnOrdering: false,
        size: 50,
        Cell: ({ renderedCellValue, row }: { renderedCellValue: any; row: MRT_Row<Fruit> }) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}
            >
              <Checkbox checked={!!renderedCellValue} disabled />
            </Box>
          )
        },
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          select: true,
          SelectProps: { defaultValue: cell.getValue() ? true : false },
          children: [
            { id: false, name: "false" },
            { id: true, name: "true" }
          ].map(dropdown => {
            return (
              // @ts-ignore
              <MenuItem key={dropdown.id.toString()} value={dropdown.id}>
                {dropdown.name}
              </MenuItem>
            )
          })
        })
      }
    ],
    [getCommonEditTextFieldProps, tags]
  )

  return (
    <div style={{ padding: "3rem" }}>
      {fruits ? (
        <DataTable
          columns={columns}
          tableData={fruits}
          onCreate={values => {
            addFruit(values)
          }}
          onReset={() => {
            resetFruit()
          }}
          onUpdate={values => {
            updateFruit(values)
          }}
          onDelete={id => {
            deleteFruit(id)
          }}
          tags={tags}
          validationErrors={validationErrors}
        />
      ) : null}
    </div>
  )
}
