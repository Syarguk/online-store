import { Products, Product } from './products';

interface Model {
  data: Products;
  filteredData: Products;
  basket: Products;
  getProducts(): Products;
  getFilteredProducts(): Products;

  setFilterProducts(filter: string, value: string): void;
  dropFilterProducts(filter: string, value: string): void
  getProduct(productId: number): Product;

  addProductToBasket(productId: number): void;
  dropProductFromBasket(poductId: number): void;
  changeBasketStorage(): void;
  getBasket(): Products;
}

export default Model;
