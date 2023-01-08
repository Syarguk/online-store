import { Products, Product } from './products';

interface Model {
  data: Products;
  isOpenPopup: boolean;

  getProducts(): Products;
  getProduct(productId: number): Product;
}

export default Model;
