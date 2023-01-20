import { products } from './data';
import Model from '../types/model';

const model: Model = {

  data: products,

  getProducts() {
    return this.data;
  },

  isOpenPopup: false,

  getProduct(productId) {
    return this.data.find((product) => product.id === productId);
  },

};

export default model;
