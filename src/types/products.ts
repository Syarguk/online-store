export type Product = {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[],
};

export type Products = Array<Product>;

export interface ObjectInterface {
  [key: string]: string | number | string[] | number[];
}

export interface ObjectForFilter {
  [key: string]: number;
}

export type ProductsRenderCallback = (products: Products) => void;
