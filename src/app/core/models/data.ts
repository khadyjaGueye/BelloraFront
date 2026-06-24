import { Product } from "./product";

export interface Model<T> {
    data: T
}

export interface Data {
    categories: Categorie[];
    users: User[];
    medecins: User[];
    products: Product[];
    categorie: Categorie;
    checkout:Checkout;
    message: string;
    success: boolean
}

export interface User {
    id: number
    email: string
    password: string
    role: string
    nom: string
    prenom: string
}
export interface Categorie {
    id: number
    libelle: string
    description: string
    image: string
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Checkout{
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
