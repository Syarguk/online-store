import { Products } from './products';

interface View {
  renderProducts(products: Products): void;
}

export default View;
