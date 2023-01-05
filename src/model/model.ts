import { Product } from '../types/products';
import { products } from './data';
import Model from '../types/model';

const model: Model = {
  data: products,
  filteredData: [],
  basket: [],

  getProducts() {
    return this.data;
  },

  getFilteredProducts() {
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
    const basket = localStorage.getItem('products-id');
    // это надо переделать!

    return JSON.parse(basket);
  },

  getProduct(productId): Product {
    const filterProducts = this.data.filter((product) => product.id === productId);
    const [product] = filterProducts;
    return product;
  },

  dropFilterProducts(filter, value) {
    const filterProd = this.filteredData.filter((product) => product[filter] !== value);
    this.filteredData = filterProd;
    // this.filteredData.concat(filterProd);

    console.log(this.filteredData);
  },

  setFilterProducts(filter, value) {
    const filterProd = this.data.filter((product) =>
    // console.log(filter);

      product[filter] === value);
    console.log(filterProd);

    this.filteredData = this.filteredData.concat(filterProd);

    // console.log(this.filteredData);
  },
};

export default model;
