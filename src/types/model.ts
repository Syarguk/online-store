import { Products, Product } from './products';

interface Model {
  data: Products;
  // filteredData: Products;
  // isInit: boolean;

  getProducts(): Products;
  getProduct(productId: number): Product;

  // getProductsForBasket(productsId: string[]): Products;
  // //talk about this metods
  // getFilterProducts(filter: string | null | undefined): void;
  // getFilteredProducts(): Products;

  // setFilterProducts(filter: string, value: string): void;
  // dropFilterProducts(filter: string, value: string): void
}

export default Model;
