import { Products } from './products';

interface View {
  renderProducts(products: Products): void;
  renderFilters(listFields: [string, number][]): void;
}

interface ViewBasket {
  renderSelectProducts(data: [Products, number]): void;
}

export { View, ViewBasket };

export type HeaderWiewArgs = [
  cost: number,
  count: number,
];
