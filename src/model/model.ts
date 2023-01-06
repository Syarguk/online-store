//import { Products } from '../types/products';
// import { Product } from '../types/products';
import { products } from './data';
import Model from '../types/model';

const model: Model = {

  data: products,
  //dont need
  // filteredData: [],
  // isInit: false,

  getProducts() {
    return this.data;
  },

  getProduct(productId) {
    const filterProducts = this.data.filter((product) => product.id === productId);
    const [product] = filterProducts;
    return product;
  },

  // getProductsForBasket(productsId) {
  //   return this.data.filter((product) => productsId.includes(String(product.id)));
  // },

  // //dont need
  // setFilterProducts(filter, value) {
  //   const filterProd = this.data.filter((product) =>
  //   // console.log(filter);

  //     product[filter] === value);
  //   console.log(filterProd);

  //   this.filteredData = this.filteredData.concat(filterProd);

  //   // console.log(this.filteredData);
  // },

  // dropFilterProducts(filter, value) {
  //   const filterProd = this.filteredData.filter((product) => product[filter] !== value);
  //   this.filteredData = filterProd;
  //   // this.filteredData.concat(filterProd);
  //   // console.log(this.filteredData);
  // },

  // getFilteredProducts() {
  //   return this.filteredData;
  // },

  // getFilterProducts(filter) {
  //   const filterProd = this.data.filter((product) => product.category === filter);
  //   this.filteredData = this.filteredData.concat(filterProd);
  // },

};

export default model;
