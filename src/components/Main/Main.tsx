import styled from "styled-components"
import React, { useCallback, useMemo, useState } from "react"
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
  Typography
} from "@mui/material"
import { DataTable } from "components/DataTable"
import {
  useGetFruitTagsQuery,
  useGetFruitsQuery,
  useGetVegetableTagsQuery,
  useGetVegetablesQuery
} from "app/api"
import { type MRT_ColumnDef, type MRT_Row } from "material-react-table"
import { type Fruit } from "types/Fruit"
import { type Tag } from "types/Tag"
import { type Vegetable } from "types/Vegetable"

const App = styled.div`
  display: grid;
  grid-template:
    "products product-view cart" 50%
    "products product-view recent" 50%/ 300px 1fr 300px;
  height: 100vh;

  .products {
    grid-area: products;
    background-color: lightblue;
  }

  .product-view {
    grid-area: product-view;
  }

  .cart {
    grid-area: cart;
    background-color: lightgray;
  }

  .recent-products {
    grid-area: recent;
    background-color: lightgreen;
  }
`

export const Main = () => {
  const { data: fruits } = useGetFruitsQuery()
  const { data: fruitTags } = useGetFruitTagsQuery()
  const { data: vegetables } = useGetVegetablesQuery()
  const { data: vegetableTags } = useGetVegetableTagsQuery()
  const [selectedRow, setSelectedRow] = useState<Fruit | Vegetable>()
  const products = useMemo(
    () =>
      fruits && vegetables
        ? [
            ...fruits.filter(fruit => !fruit.isArchived),
            ...vegetables.filter(veg => !veg.isArchived)
          ]
        : [],
    [fruits, vegetables]
  )
  const findType = useCallback(
    (id?: string) => {
      return id
        ? fruits && fruits?.findIndex(el => el.id === id) > -1
          ? "fruit"
          : vegetables && vegetables?.findIndex(el => el.id === id) > -1
          ? "vegetables"
          : ""
        : ""
    },
    [fruits, vegetables]
  )

  const columns = useMemo<MRT_ColumnDef<Fruit | Vegetable>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        enableColumnOrdering: false,
        size: 50
      },
      {
        accessorKey: "tags",
        header: "Tags",
        size: 100,
        enableColumnOrdering: false,
        Cell: ({
          renderedCellValue,
          row
        }: {
          renderedCellValue: any
          row: MRT_Row<Fruit | Vegetable>
        }) => {
          const tags =
            findType(row.original.id) === "fruit"
              ? fruitTags
              : findType(row.original.id) === "vegetables"
              ? vegetableTags
              : []
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
        }
      }
    ],
    [findType, fruitTags, vegetableTags]
  )
  const tags =
    findType(selectedRow?.id) === "fruit"
      ? fruitTags
      : findType(selectedRow?.id) === "vegetables"
      ? vegetableTags
      : []
  return (
    <App>
      <div className="products">
        {products && fruitTags && vegetableTags ? (
          <DataTable
            columns={columns}
            enablePagination={false}
            hideActions
            hideTopButtons
            onRowSelected={row => {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
              setSelectedRow(row)
            }}
            tableData={products}
            tags={[...fruitTags, ...vegetableTags]}
          />
        ) : null}
      </div>
      <div className="product-view">
        {selectedRow ? (
          <Card sx={{ marginLeft: "5rem", marginRight: "5rem", marginTop: "5rem" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedRow.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedRow.description}
                </Typography>
                <Box sx={{ display: "flex", marginTop: "0.5rem" }}>
                  <Typography
                    sx={{ marginRight: "0.25rem" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {"Tags: "}
                  </Typography>
                  {selectedRow.tags?.map((id, index) => {
                    return (
                      <Typography
                        sx={{ marginRight: "0.25rem" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {tags?.filter(tag => tag.id === id)[0].name}
                        {selectedRow.tags && index === selectedRow.tags.length - 1 ? "" : ", "}
                      </Typography>
                    )
                  })}
                </Box>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                {"Add to Cart"}
              </Button>
            </CardActions>
          </Card>
        ) : null}
      </div>
      <div className="cart"></div>
      <div className="recent-products"></div>
    </App>
  )
}
