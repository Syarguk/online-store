import { Products } from './products';

interface Model {
  data: Products;
  filteredData: Products | [];
  basket: Products | [];
  getData(): Products;
  addProductToBasket(productId: number): void;
  getProduct(productId: number): Products;
}

export default Model;
