import { Products } from './products';
import { UPC, ProCod } from './basket';

interface View {
  renderProducts(products: Products, containerEl: HTMLDivElement): void;
  changeProductsCount(count: number): void;
  //(products: Products): void;
  //renderFilters(listFields: [string, number][]): void;
}

interface ViewBasket {
  renderSelectProducts(data: [Products, number]): void;
  renderUsedPromoCode(prCodes: ProCod, usdPrCodes: UPC): void;
  renderModalCheckout(): void;
}

export { View, ViewBasket };
