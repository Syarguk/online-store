import { ObjectInterface, ObjectForFilter, ProductsRenderCallback } from '../types/products';
// eslint-disable-next-line import/no-cycle
import { updateUrl } from '../router/router';
import { routes } from '../common/constans';
import model from '../model/model';
import multiFilter from '../common/filter/multiFilter';
import { changeParamsForUrl } from '../common/urlHelpers';

const checkOptions = (name:string, options: ObjectInterface | undefined): string[] => {
  if (options) {
    const names = options[name];
    if (names && Array.isArray(names)) {
      return names.map((i) => String(i));
    }
  }
  return [];
};

const renderFilter = (name: string, filter: ObjectForFilter, options?: ObjectInterface): string => {
  const names = checkOptions(name, options);

  const labels = Object.entries(filter)
    .map((item) => {
      const [value, count] = item;
      const checked = names.includes(value) ? 'checked' : '';
      const html = `
    <div class="d-flex justify-content-between">
    <label class="form-check-label" for="prod2">
    <input class="form-check-input" type="checkbox" name="${name}" value="${value}" ${checked}>
      ${value}
    </label>
    <div class="filter-count">
      <span>${count}</span>
      <span>/</span>
      <span>${count}</span>
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

class ProductFilter {
  filter: ObjectForFilter;

  filterName: string;

  productsRender: ProductsRenderCallback;

  filterEl: HTMLDivElement;

  options?: ObjectInterface;

  constructor(
    filter: ObjectForFilter,
    filterName: string,
    productsRender:ProductsRenderCallback,
    options?: ObjectInterface,
  ) {
    this.filter = filter;
    this.filterName = filterName;
    this.productsRender = productsRender;
    this.filterEl = document.createElement('div');
    this.options = options;
  }

  init(): HTMLDivElement {
    this.render();
    this.attachEvents();

    return this.filterEl;
  }

  render(): void {
    this.filterEl.innerHTML = renderFilter(this.filterName, this.filter, this.options);
  }

  private attachEvents(): void {
    this.filterEl.addEventListener('change', (e) => {
      const checkbox = e.target as HTMLInputElement;
      const { value } = checkbox;
      if (checkbox.checked) {
        multiFilter.addToMultiOptions(this.filterName, value);
      } else {
        multiFilter.dropFromMultiOptions(this.filterName, value);
      }
      const filteredData = multiFilter.getFilteredData(model.getProducts());
      this.productsRender(filteredData);
      const currentFilters = multiFilter.getMultiOptions(this.filterName);
      const params = changeParamsForUrl(this.filterName, currentFilters);
      updateUrl(routes.mainSearch, params);
    });
  }
}

export default ProductFilter;
