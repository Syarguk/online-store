import { Products } from './products';

interface Model {
  data: Products;
  filteredData: Products | [];
  basket: Products | [];
  fieldsProduct: string[];
  getProducts(): Products;
  addProductToBasket(productId: number): void;
  getProduct(productId: number): Products;
  delProductFromBasket(poductId: number): void;
  getListFields(nameField: string): void;
}

export default Model;
