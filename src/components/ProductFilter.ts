import { ObjectForFilter, ObjectInterface, ProductsRenderCallback } from '../types/products';
// eslint-disable-next-line import/no-cycle
import { updateUrl } from '../router/router';
import { routes } from '../common/constans';
import model from '../model/model';
import multiFilter from '../common/filter/multiFilter';

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

const getParamsToUrl = (name: string, value: string[]): ObjectInterface => ({ [name]: value });

class ProductFilter {
  filter: ObjectForFilter;

  filterName: string;

  productsRender: ProductsRenderCallback;

  filterEl: HTMLDivElement;

  constructor(filter: ObjectForFilter, filterName: string, productsRender:ProductsRenderCallback) {
    this.filter = filter;
    this.filterName = filterName;
    this.productsRender = productsRender;
    this.filterEl = document.createElement('div');
  }

  init(): HTMLDivElement {
    this.render();
    this.attachEvents();

    return this.filterEl;
  }

  render(): void {
    this.filterEl.classList.add('form-check', 'me-2');
    this.filterEl.innerHTML = renderFilter(this.filterName, this.filter);
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
      const currentFilterss = multiFilter.getMultiOptions(this.filterName);
      const params = getParamsToUrl(this.filterName, currentFilterss);
      updateUrl(routes.mainSearch, params);
    });
  }
}

export default ProductFilter;
