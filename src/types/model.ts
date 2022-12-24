import { Products, Product } from './products';

interface Model {
  data: Products;
  filteredData: Products;
  basket: Products;
  getProducts(): Products;
  addProductToBasket(productId: number): void;
  getProduct(productId: number): Product;
  dropProductFromBasket(poductId: number): void;
  getBasket(): Products;

}

export default Model;
