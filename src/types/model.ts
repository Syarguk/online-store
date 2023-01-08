import { Products, Product } from './products';

interface Model {
  data: Products;

  getProducts(): Products;
  getProduct(productId: number): Product;

}

export default Model;
