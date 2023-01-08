import { products } from './data';
import Model from '../types/model';

const model: Model = {

  data: products,

  getProducts() {
    return this.data;
  },

  getProduct(productId) {
    const filterProducts = this.data.filter((product) => product.id === productId);
    const [product] = filterProducts;
    return product;
  },

};

export default model;
