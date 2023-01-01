import { Products, Product } from './products';

interface Model {
  data: Products;
  filteredData: Products;
  getProducts(): Products;
  addProductToBasket(productId: number): void;
  getFilterProducts(filter: string | null | undefined): void;
  getProduct(productId: number): Product;
  dropProductFromBasket(poductId: number): void;
  changeBasketStorage(): void;
  getBasket(): Products;
}

export default Model;
