import { Product } from '../types/products';

type Elements = {
  card: HTMLElement | null;
};

class ProductBasket {
  constructor(product: Product) {
    this.product = product;
  }

  product: Product;

  elements: Elements = {
    card: null,
  };

  render(): void {
    const filterEl = document.createElement('div');
    filterEl.classList.add('form-check', 'me-2');
    filterEl.innerHTML = `<input class="form-check-input" type="checkbox" value="prod1" id="prod2">
                            <div class="d-flex justify-content-between">
                              <label class="form-check-label" for="prod2"></label>
                              <div class="filter-count">
                                <span>5</span>
                                <span>/</span>
                                <span></span>
                              </div>
                            </div>`;
    this.elements.card = filterEl;
  }

  init() {
    this.render();
    return this.elements.card;
  }
}

export default ProductBasket;
