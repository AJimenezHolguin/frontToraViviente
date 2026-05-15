import { CategoryProps } from "@/types/category.enum";

export const categoryOptions = Object.values(
  CategoryProps
).map((category) => ({
  label: category,
  value: category,
}));