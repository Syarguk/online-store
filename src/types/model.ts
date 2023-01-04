import { Products, Product } from './products';

interface Model {
  data: Products;
  filteredData: Products;

  getProducts(): Products;
  getFilteredProducts(): Products;

  setFilterProducts(filter: string, value: string): void;
  dropFilterProducts(filter: string, value: string): void
  getProduct(productId: number): Product;

  getFilterProducts(filter: string | null | undefined): void;

  addProductToBasket(productId: number): void;

}

export default Model;
