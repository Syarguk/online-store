import { Product } from '../types/products';
import { products } from './data';
import Model from '../types/model';

const model: Model = {
  data: products,
  filteredData: [],
  basket: [],

  getProducts() {
    if (this.filteredData.length === 0) {
      return this.data;
    }
    return this.filteredData;
  },

  addProductToBasket(productId) {
    const product = this.getProduct(productId);
    const basket = this.getBasket();
    basket.push(product);
    window.localStorage.setItem('basket', JSON.stringify(basket));
  },

  dropProductFromBasket(productId) {
    let basket = this.getBasket();
    let tmp = [];
    for (let i = 0; i < basket.length; i += 1) {
      if (basket[i].id !== productId) {
        tmp.push(basket[i]);
      } else {
        tmp = [...basket.slice(i + 1), ...tmp];
        basket = tmp;
        window.localStorage.setItem('basket', JSON.stringify(basket));
        break;
      }
    }
  },

  getBasket() {
    const basket = window.localStorage.getItem('basket');
    if (basket === null) return [];
    return JSON.parse(basket);
  },

  getProduct(productId): Product {
    const filterProducts = this.data.filter((product) => product.id === productId);
    const [product] = filterProducts;
    return product;
  },

  getFilterProducts(filter) {
    const filterProd = this.data.filter((product) => product.category === filter);
    this.filteredData = this.filteredData.concat(filterProd);
  },
};

export default model;
