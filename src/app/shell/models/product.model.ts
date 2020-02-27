export class ProductPage {
    products: Product[];
    totalCount: number;
}

export class Product {
    id: number;
    name: string;
    subheader: string;
    isdeleted: boolean;
    price: number;
    categorycount: number;
    categories: [];
    notificationid: number;
}