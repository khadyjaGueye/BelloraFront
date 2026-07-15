import { Product } from "./product";

export interface Model<T> {
  data: T
}

export interface Data {
  categories: Categorie[];
  users: User[];
  products: Product[];
  orders: Order[];
  product: Product
  category: Categorie;
  user: User;
  checkout: Checkout;
  message: string;
  success: boolean,
  token: string
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  is_active: boolean;
  exp: number;
  iat: number;
}

export interface Categorie {
  id: number;
  name: string
  description: string;
  image: string;
  category: Category2;
  lastProduct?: LastProduct;
}

export interface Category2 {
  id: number
  name: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface LastProduct {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
  category_id: number
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Checkout {
  customer_name: string
  customer_phone: string
  customer_address: string
  total_amount: number
  items: Item[]
}

export interface Item {
  product_id: number
  quantity: number
  price: number
}

export interface AuthResponse {
  data: {
    success: boolean;
    message: string;
    token: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      role: string;
      is_active: number;
      created_at: string;
      updated_at: string;
    };
  };
}


export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_amount: string;
  status: string;
  user_id: number;
  created_at: string;
}


