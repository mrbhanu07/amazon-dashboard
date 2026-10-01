export type Category = "Electronics" | "Clothes" | "Shoes";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  rating: number;
  image: string;
}