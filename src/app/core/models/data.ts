import { Product } from "./product";

export interface Model<T> {
    data: T
}

export interface Data {
    categories: Categorie[];
    users: User[];
    medecins: User[];
    categorie: Categorie
    message: string;
    products: Product[];
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
