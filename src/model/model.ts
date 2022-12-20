import { products } from './data';
import Model from '../types/model';

const model: Model = {
  data: products,
  filteredData: [],
  basket: [],

  getData() {
    if (this.filteredData.length === 0) {
      return this.data;
    }
    return this.filteredData;
  },

  addProductToBasket(productId) {
    const product = this.getProduct(productId);
    this.basket = [...product, ...this.basket];
  },

  getProduct(productId) {
    return this.data.filter((product) => product.id === productId);
  },
};

export default model;
