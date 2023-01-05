import { Product } from '../types/products';
import { products } from './data';
import Model from '../types/model';

const model: Model = {

  data: products,
  filteredData: [],

  getProducts() {
    if (this.filteredData.length === 0) {
      return this.data;
    }
    return this.filteredData;
  },

  getProductsForBasket(productsId) {
    return this.data.filter((product) => productsId.includes(String(product.id)));
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
