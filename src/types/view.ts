import { Products } from './products';

interface View {
  renderProducts(products: Products, containerEl: HTMLDivElement): void;
  renderFilters(listFields: [string, number][]): void;
  renderBasket(productsId: number[]): void;
}

export default View;

export type HeaderWiewArgs = {
  cost: number,
  count: number,
};
