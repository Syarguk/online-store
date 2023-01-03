import { ObjectForFilter, ObjectInterface } from '../types/products';
import { transformParamsToUrl, transformUrlToParams, updateUrl } from '../common/urlHelpers';
import { routes } from '../common/constans';

type Elements = {
  filterEl: HTMLElement | null;
};

const renderFilter = (name: string, filter: ObjectForFilter): string => {
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
  <h5 class="card-title text-center">${name.toUpperCase()}</h5>
  <div class="check-form">
  <form class="form-check me-2">
${labels.join('')}
  </form>
  </div>
  </div>
  </div>`;

  return html;
};

const getParamsToUrl = (name: string, value: string[]): ObjectInterface => ({ [name]: value });

class ProductFilter {
  filter: ObjectForFilter;

  filterName: string;

  elements: Elements = {
    filterEl: null,
  };

  currentFilters: string[] = [];

  constructor(filter: ObjectForFilter, filterName: string) {
    this.filter = filter;
    this.filterName = filterName;
  }

  init() {
    this.render();
    this.attachEvents();

    return this.elements.filterEl;
  }

  render(): void {
    const filterEl = document.createElement('div');
    filterEl.classList.add('form-check', 'me-2');

    filterEl.innerHTML = renderFilter(this.filterName, this.filter);
    this.elements.filterEl = filterEl;
  }

  private attachEvents(): void {
    this.elements.filterEl?.addEventListener('change', (e) => {
      const checkbox = e.target as HTMLInputElement;
      if (checkbox.checked) {
        this.currentFilters.push(checkbox.value);
      } else {
        this.currentFilters = this.currentFilters.filter((val) => val !== checkbox.value);
      }

      // const currentUrl = new URL(window.location.href).pathname;
      // console.log(currentUrl);

      const params = getParamsToUrl(this.filterName, this.currentFilters);
      updateUrl(routes.mainSearch, params);
    });
  }
}

export default ProductFilter;
