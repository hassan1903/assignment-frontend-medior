// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { fruitsCrud } from "./mocks/fruits"
import { fruitTags } from "./mocks/fruitTags"
import { vegetableTags } from "./mocks/vegetableTags"
import { vegetablesCrud } from "./mocks/vegetables"
import { type Fruit } from "types/Fruit"
import { type Tag } from "../types/Tag"
import { type Vegetable } from "../types/Vegetable"

const resolveAsync = <T>(data: any, delay = 0) =>
  new Promise<T>(resolve => {
    setTimeout(() => resolve({ ...data }), delay)
  })

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Fruit", "Vegetable"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://" }),
  endpoints: builder => ({
    getFruits: builder.query<Fruit[], void>({
      queryFn: () => resolveAsync({ data: fruitsCrud.getItems() }),
      providesTags: ["Fruit"]
    }),
    addFruit: builder.mutation<Fruit, Omit<Fruit, "id">>({
      queryFn: fruit => resolveAsync({ data: fruitsCrud.addItem(fruit) }),
      invalidatesTags: ["Fruit"]
    }),
    updateFruit: builder.mutation<Fruit, Fruit>({
      queryFn: fruit => resolveAsync({ data: fruitsCrud.updateItem(fruit) }),
      invalidatesTags: ["Fruit"]
    }),
    deleteFruit: builder.mutation<Fruit, string>({
      queryFn: id => resolveAsync({ data: fruitsCrud.deleteItem(id) }),
      invalidatesTags: ["Fruit"]
    }),
    getVegetables: builder.query<Vegetable[], void>({
      queryFn: () => resolveAsync({ data: vegetablesCrud.getItems() }),
      providesTags: ["Vegetable"]
    }),
    addVegetable: builder.mutation<Vegetable, Omit<Vegetable, "id">>({
      queryFn: vegetable => resolveAsync({ data: vegetablesCrud.addItem(vegetable) }),
      invalidatesTags: ["Vegetable"]
    }),
    updateVegetable: builder.mutation<Vegetable, Vegetable>({
      queryFn: vegetable => resolveAsync({ data: vegetablesCrud.updateItem(vegetable) }),
      invalidatesTags: ["Vegetable"]
    }),
    deleteVegetable: builder.mutation<Vegetable, string>({
      queryFn: id => resolveAsync({ data: vegetablesCrud.deleteItem(id) }),
      invalidatesTags: ["Vegetable"]
    }),
    getFruitTags: builder.query<Tag[], void>({
      queryFn: () => resolveAsync({ data: fruitTags })
    }),
    getVegetableTags: builder.query<Tag[], void>({
      queryFn: () => resolveAsync({ data: vegetableTags })
    }),
    resetFruit: builder.mutation<Fruit, void>({
      queryFn: () => resolveAsync({ data: fruitsCrud.reset() }),
      invalidatesTags: ["Fruit"]
    }),
    resetVegetable: builder.mutation<Vegetable, void>({
      queryFn: () => resolveAsync({ data: vegetablesCrud.reset() }),
      invalidatesTags: ["Vegetable"]
    })
  })
})

export const {
  useGetFruitsQuery,
  useAddFruitMutation,
  useUpdateFruitMutation,
  useDeleteFruitMutation,
  useGetVegetablesQuery,
  useAddVegetableMutation,
  useUpdateVegetableMutation,
  useDeleteVegetableMutation,
  useGetFruitTagsQuery,
  useGetVegetableTagsQuery,
  useResetFruitMutation,
  useResetVegetableMutation
} = api
