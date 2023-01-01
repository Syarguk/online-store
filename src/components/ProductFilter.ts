import { ObjectInterface } from '../types/products';

type Elements = {
  card: HTMLElement | null;
};

const renderFilter = (name: string, filter: ObjectInterface): string => {
  const labels = Object.entries(filter)
    .map((item) => {
      const [value, count] = item;
      const html = `
    <div class="d-flex justify-content-between">
    <label class="form-check-label" for="prod2">
    <input class="form-check-input" type="checkbox" name="${name}" value="${value}">
      ${value}
    </label>
    <div class="filter-count">
      <span>${count}</span>
      <span>/</span>
      <span>6</span>
    </div>
  </div>`;
      return html;
    });

  const html = ` <div class="card">
<div class="card-body pe-0">
  <h5 class="card-title text-center">${name}</h5>
  <div class="check-form">
  <form class="form-check me-2">
${labels.join('')}
  </form>
  </div>
  </div>
  </div>`;

  return html;
};

class ProductFilter {
  constructor(filter: ObjectInterface, filterName: string) {
    this.filter = filter;
    this.filterName = filterName;
  }

  filter: ObjectInterface;

  filterName: string;

  elements: Elements = {
    card: null,
  };

  render(): void {
    const filterEl = document.createElement('div');
    filterEl.classList.add('form-check', 'me-2');

    filterEl.innerHTML = renderFilter(this.filterName, this.filter);
    this.elements.card = filterEl;
  }

  init() {
    this.render();
    return this.elements.card;
  }
}

export default ProductFilter;
