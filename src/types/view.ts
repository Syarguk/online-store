import { Products } from './products';

interface View {
  renderProducts(products: Products): void;
  renderFilters(listFields: [string, number][]): void;
}

export default View;

export type HeaderWiewArgs = {
  cost: number,
  count: number,
};
