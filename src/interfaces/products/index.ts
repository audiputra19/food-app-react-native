export interface Product {
    product: any;
    id: number;
    img: string;
    title: string;
    price: number;
    rate: string;
    disc: number;
    category: string;
    sold: number;
    desc: string;
}

export interface Review {
    id: number;
    name: string;
    id_product: number;
    review: string;
    date: Date;
}

export interface SearchProduct {
    id: number;
    title: string;
}