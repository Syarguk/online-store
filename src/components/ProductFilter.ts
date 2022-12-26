import model from "../model/model";
import view from "../view/view";

type Filter = [string, number];

type Elements = {
  card: HTMLElement | null;
};

class ProductFilter {
  constructor(filter: Filter) {
    this.filter = filter;
  }

  filter: Filter;

  elements: Elements = {
    card: null,
  };

  render(): void {
    const filterEl = document.createElement('div');
    filterEl.classList.add('form-check', 'me-2');
    filterEl.innerHTML = `<input class="form-check-input" type="checkbox" value="prod1" id="prod2">
                            <div class="d-flex justify-content-between">
                              <label class="form-check-label" for="prod2">${this.filter[0]}</label>
                              <div class="filter-count">
                                <span>5</span>
                                <span>/</span>
                                <span>${this.filter[1]}</span>
                              </div>
                            </div>`;
    this.elements.card = filterEl;
  }

  attachEvents() {
    if (this.elements.card !== null) {
      this.elements.card.addEventListener('click', (e) => {
        if (e.target) {
          const target = e.target as HTMLElement;
          const category = target.parentElement?.children[1].children[0].textContent;
          model.getFilterProducts(category);
          view.renderProducts(model.getProducts());
        }
      });
    }
  }

  init() {
    this.render();
    this.attachEvents();
    return this.elements.card;
  }
}

export default ProductFilter;
