export class CategoryPage {
  categories: Category[];
  totalCount: number;
}
export class Category {
  id: number;
  name: string;
  isdeleted: boolean;
  productcount: number;
  products: [];
  notificationid: number;
}
