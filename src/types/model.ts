import { Products } from './products';

interface Model {
  data: Products;
  filteredData: Products | [];
  basket: Products | [];
  getProducts(): Products;
  addProductToBasket(productId: number): void;
  getProduct(productId: number): Products;
  delProductFromBasket(poductId: number): void;
}

export default Model;
