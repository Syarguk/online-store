import { Products } from './products';
import { UPC, ProCod } from './basket';

interface View {
  renderProducts(products: Products, containerEl: HTMLDivElement): void;
  renderFilters(listFields: [string, number][]): void;
}

interface ViewBasket {
  renderSelectProductsPage(data: [Products, number]): void;
  // changeSelectProducts(products: Products): void;
  renderSelectProducts(data: Products, cardsContainer: any): void;
  renderUsedPromoCode(prCodes: ProCod, usdPrCodes: UPC): void;
  checkInput(e: Event): void;
  renderModalCheckout(): void;
}

export { View, ViewBasket };

export type HeaderWiewArgs = [
  cost: number,
  count: number,
];
