import { iCategory } from './category.interface';

export interface iItem {
    id: number;
    name: string;
    price: number;
    desc: string;
    imageUrl: string;
    inStore: boolean;
    canShip: boolean;
    stock: number;
    categories: iCategory[];
}