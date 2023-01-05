import { Product } from '../types/products';
import { products } from './data';
import Model from '../types/model';

const model: Model = {

  data: products,
  filteredData: [],

  getProducts() {
    return this.data;
  },

  getProductsForBasket(productsId) {
    return this.data.filter((product) => productsId.includes(String(product.id)));
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


  getProduct(productId): Product {
    const filterProducts = this.data.filter((product) => product.id === productId);
    const [product] = filterProducts;
    return product;
  },



};

export default model;
