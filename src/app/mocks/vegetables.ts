import { CRUD } from "./CRUD"
import { Vegetable } from "../../types/Vegetable"
// list of 20 fruits
export const vegetables: Vegetable[] = [
  {
    id: "a16e1a2f-7207-4f8e-bdfd-9e81910b064f",
    name: "Broccoli",
    description:
      "Broccoli is a cruciferous vegetable that is rich in nutrients, including fiber, vitamin C, and vitamin K. It is often eaten cooked or raw as a side dish or added to salads.",
    tags: ["1e682eac-0e96-4460-8b56-621193c6d409", "07a9774d-6261-443c-8bb7-9fb61e8fce05"]
  },
  {
    id: "54c4d1a2-bf7c-4c29-b89a-5d6ba5f6c5eb",
    name: "Carrots",
    description:
      "Carrots are a root vegetable that are high in beta-carotene, a compound that is converted to vitamin A in the body. They can be eaten raw or cooked, and are often used in soups, stews, and salads.",
    tags: ["07a9774d-6261-443c-8bb7-9fb61e8fce05"]
  },
  {
    id: "5d6b1e86-2210-4fbb-8a60-9af9cc441f39",
    name: "Spinach",
    description:
      "Spinach is a leafy green vegetable that is high in iron, calcium, and vitamin C. It can be eaten raw or cooked, and is often used in salads, soups, and as a side dish.",
    tags: ["1e682eac-0e96-4460-8b56-621193c6d409", "f7ff5302-740e-46bf-877a-d98f5a36926c"]
  },
  {
    id: "0ecb0a92-35db-4f26-a584-1e8d23c9e57f",
    name: "Cauliflower",
    description:
      "Cauliflower is a cruciferous vegetable that is high in fiber, vitamins C and K, and folate. It can be eaten raw or cooked, and is often used as a low-carb alternative to rice or mashed potatoes."
  },
  {
    id: "2bfc825d-d1e8-4db3-bc43-55f6b3da6d8f",
    name: "Bell Pepper",
    description:
      "Bell peppers come in a variety of colors, including green, red, and yellow. They are high in vitamin C and are often used in salads, stir-fries, and as a topping for pizza.",
    tags: ["1e682eac-0e96-4460-8b56-621193c6d409"]
  },
  {
    id: "9c9c86fa-5d5a-42b8-9a21-2f181ed5e5e1",
    name: "Tomatoes",
    description:
      "Tomatoes are a fruit that are often used as a vegetable in cooking. They are high in vitamins C and K, and are often used in salads, sandwiches, and as a base for sauces.",
    tags: ["f7ff5302-740e-46bf-877a-d98f5a36926c"]
  },
  {
    id: "f8d9e0b4-4c6d-4aeb-bc6d-30e91fa936d4",
    name: "Zucchini",
    description:
      "Zucchini is a summer squash that is low in calories and high in vitamins A and C. It can be eaten raw or cooked, and is often used in stir-fries, soups, and as a low-carb alternative to pasta.",
    isArchived: true
  }
]

export const vegetablesCrud = new CRUD<Vegetable>("vegetables", vegetables)
