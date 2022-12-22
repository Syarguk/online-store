import { products } from './data';
import Model from '../types/model';

const model: Model = {
  data: products,
  filteredData: [],
  basket: [],
  fieldsProduct: ['category', 'brand'],

  getProducts() {
    if (this.filteredData.length === 0) {
      return this.data;
    }
    return this.filteredData;
  },

  addProductToBasket(productId) {
    const product = this.getProduct(productId);
    this.basket = [...product, ...this.basket];
  },
  delProductFromBasket(productId) {
    const filtredBasket = this.basket.filter((product) => product.id !== productId);
    this.basket = [...filtredBasket];
  },

  getProduct(productId) {
    return this.data.filter((product) => product.id === productId);
  },

  getListFields(nameField) {
    const listFields = {};
    this.data.forEach((product) => {
      if (product[nameField] in listFields) listFields[product[nameField]] += 1;
      else listFields[product[nameField]] = 1;
    });
    return Object.entries(listFields);
  },
};

export default model;
