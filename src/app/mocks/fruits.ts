import { Fruit } from "../../types/Fruit"
import { CRUD } from "./CRUD"

let fruits: Fruit[] = [
  {
    id: "ee7f425d-1901-41cb-9f81-9269c33a19e2",
    name: "Apples",
    description:
      "Apples are a fruit that are high in fiber and vitamin C. They come in a variety of colors and flavors, and can be eaten raw or cooked. Apples are often used in desserts, salads, and as a snack.",
    tags: ["734dd2a5-821f-4cd1-8a89-f8bfd6de6e81", "d300d725-2130-4c0b-ae46-17256d95ebe5"]
  },
  {
    id: "14d1d858-22a1-4827-9c0a-58c749e38423",
    name: "Bananas",
    description:
      "Bananas are a fruit that are high in potassium, fiber, and vitamin C. They can be eaten raw or cooked, and are often used in smoothies, baked goods, and as a snack.",
    tags: ["d300d725-2130-4c0b-ae46-17256d95ebe5"]
  },
  {
    id: "104947eb-86d1-4dfe-b82b-4b62fc6c7f4d",
    name: "Oranges",
    description:
      "Oranges are a citrus fruit that are high in vitamin C and fiber. They can be eaten raw or used in juices, salads, and as a flavoring in baked goods.",
    tags: ["734dd2a5-821f-4cd1-8a89-f8bfd6de6e81"]
  },
  {
    id: "99e2d678-8f45-4a3a-b846-c3ec52e5488a",
    name: "Strawberries",
    description:
      "Strawberries are a berry that are high in vitamin C and antioxidants. They can be eaten raw, used in desserts, or as a topping for yogurt or cereal.",
    tags: ["d62c0047-8455-4c42-8b18-c7077f0154ad"]
  },
  {
    id: "7b6ec753-7f0f-49a7-a29d-40ecf7a06bbf",
    name: "Blueberries",
    description:
      "Blueberries are a berry that are high in antioxidants and fiber. They can be eaten raw, used in desserts, or as a topping for yogurt or cereal."
  },
  {
    id: "8f3d518e-47de-4f8d-b5d6-5ef6a5e6a5f9",
    name: "Grapes",
    description:
      "Grapes are a fruit that come in a variety of colors and flavors. They are high in antioxidants and can be eaten raw, used in desserts, or as a snack.",
    tags: ["734dd2a5-821f-4cd1-8a89-f8bfd6de6e81"]
  },
  {
    id: "c9b9d9a7-945a-4ea4-8b8d-1a03f1c8460e",
    name: "Pineapple",
    description:
      "Pineapple is a tropical fruit that is high in vitamin C and bromelain, an enzyme that aids in digestion. It can be eaten raw, used in desserts, or as a topping for pizza or burgers.",
    tags: ["d62c0047-8455-4c42-8b18-c7077f0154ad"]
  },
  {
    id: "9b22d97a-0a24-4f2c-b679-94f7e74a87a5",
    name: "Kiwi",
    description:
      "Kiwi is a fruit that is high in vitamin C and fiber. It has a sweet and tangy flavor and can be eaten raw or used in desserts.",
    isArchived: true
  }
]

export const fruitsCrud = new CRUD<Fruit>("fruits", fruits)
