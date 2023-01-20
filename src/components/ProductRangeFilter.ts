import {
  ObjectInterface, ProductsRenderCallback, Product,
} from '../types/products';
import model from '../model/model';
// eslint-disable-next-line import/no-cycle
import { updateUrl } from '../router/router';
import { routes } from '../common/constans';
import multiFilter from '../common/filter/multiFilter';
import { changeParamsForUrl } from '../common/urlHelpers';

const getMinMax = (name: string) => {
  const key = name as keyof Product;
  const find = [...model.getProducts()]
    .map((item) => item[key])
    .sort((a, b) => Number(a) - Number(b));
  const min = find.shift();
  const max = find.pop();
  return [min, max];
};

class RangeFilter {
  filterName: string;

  callback: ProductsRenderCallback;

  filterEl: HTMLDivElement;

  options?: ObjectInterface;

  constructor(
    filterName: string,
    callback:ProductsRenderCallback,
    options?: ObjectInterface,
  ) {
    this.filterName = String(filterName);
    this.callback = callback;
    this.filterEl = document.createElement('div');
    this.options = options;
  }

  init():HTMLDivElement {
    this.render();

    return this.filterEl;
  }

  render(): void {
    this.filterEl.classList.add('card');

    const [min, max] = getMinMax(this.filterName);
    let minValue = min;
    let maxValue = max;

    if (this.options) {
      const values = this.options[this.filterName];
      if (values && Array.isArray(values)) {
        [minValue, maxValue] = values;
      }
    }

    this.filterEl.innerHTML = `<div class="card-body d-flex flex-column gap-3 mb-2">
    <h5 class="card-title text-center text-uppercase">${this.filterName}</h5>
  <div class="d-flex justify-content-between">
  <span class="js-range-min">${minValue}</span>
  <span>⟷</span>
  <span class="js-range-max">${maxValue}</span>
  </div>

    <div class="range">
      <div class="range-slider">
        <span class="range-selected"></span>
      </div>
      <div class="range-input">
        <input type="range" class="min" min="${min}" max="${max}" value="${minValue}">
        <input type="range" class="max" min="${min}" max="${max}" value="${maxValue}">
      </div>
    </div>
  </div>`;
    this.attachEvents();
  }

  attachEvents():void {
    const rangeInput = this.filterEl.querySelectorAll('.range-input input');

    rangeInput.forEach((input) => {
      input.addEventListener('change', () => {
        const min = rangeInput[0] as HTMLInputElement;
        const max = rangeInput[1] as HTMLInputElement;

        const minRange = min.value;
        const maxRange = max.value;

        const spanMin = this.filterEl.querySelector('.js-range-min');
        const spanMax = this.filterEl.querySelector('.js-range-max');

        if (spanMin && spanMax) {
          spanMin.textContent = minRange;
          spanMax.textContent = maxRange;
        }

        multiFilter.changeOption(this.filterName, [minRange, maxRange]);
        this.callback(multiFilter.getFilteredData(model.getProducts()));
        updateUrl(routes.mainSearch, changeParamsForUrl(this.filterName, [minRange, maxRange]));
      });
    });
  }
}

export default RangeFilter;
