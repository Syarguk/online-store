import { Products } from './products';

interface View {
  renderProducts(products: Products): void;
  renderFilters(listFields: []): void;
}

export default View;
