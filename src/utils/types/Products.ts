export interface Product {
  name: string;
  pure_name?: string;
  price: string;
  image: string;
  total_sale: string;
  type_discount?: Dicount;
};

export enum Dicount {
  '1-1',
  '2-2',
}
