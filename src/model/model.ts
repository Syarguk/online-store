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
    this.basket.push(product);
    this.changeBasketStorage();
  },

  dropProductFromBasket(productId) {
    let tmp = [];
    for (let i = 0; i < this.basket.length; i += 1) {
      if (this.basket[i].id !== productId) {
        tmp.push(this.basket[i]);
      } else {
        tmp = [...this.basket.slice(i + 1), ...tmp];
        this.basket = tmp;
        break;
      }
    }
    this.changeBasketStorage();
  },

  changeBasketStorage() {
    const productId = this.basket.map((product) => product.id);
    localStorage.setItem('products-id', JSON.stringify(productId));
  },

  getBasket() {
    return this.basket;
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
