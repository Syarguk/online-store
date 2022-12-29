import { Products, Product } from './products';

interface Bis {
  [key: number]: number;
}

interface Model {
  data: Products;
  filteredData: Products;
  basket: Products;
  basketInStorage: Bis;
  getProducts(): Products;
  addProductToBasket(productId: number): void;
  getFilterProducts(filter: string | null | undefined): void;
  getProduct(productId: number): Product;
  dropProductFromBasket(poductId: number): void;
  changeBasketStorage(productId?: number, incrDecr?: boolean): void;
  getBasket(): Products;
}

export default Model;
