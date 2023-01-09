import { ObjectInterface, ProductsRenderCallback, Product } from '../types/products';
import model from '../model/model';

const h = `<div class="card-body d-flex flex-column gap-3 mb-2">
  <h5 class="card-title text-center text-uppercase">Price</h5>
<div class="d-flex justify-content-between">
<span class="js-range-min">10</span>
<span>⟷</span>
<span class="js-range-max">100</span>
</div>

  <div class="range">
    <div class="range-slider">
      <span class="range-selected"></span>
    </div>
    <div class="range-input">
      <input type="range" class="min" min="0" max="1000" value="0">
      <input type="range" class="max" min="0" max="1000" value="1000">
    </div>
  </div>
</div>
`;

class RangeFilter {
  filterName: string;

  productsRender: ProductsRenderCallback;

  filterEl: HTMLDivElement;

  options?: ObjectInterface;

  constructor(
    filterName: string,
    productsRender:ProductsRenderCallback,
    options?: ObjectInterface,
  ) {
    this.filterName = String(filterName);
    this.productsRender = productsRender;
    this.filterEl = document.createElement('div');
    this.options = options;
  }

  render() {
    this.filterEl.classList.add('card');
    let min;
    let max;
    if (this.options) {
      const values = this.options[this.filterName];
      if (values && Array.isArray(values)) {
        min = String(values[0]);
        max = String(values[1]);
      } else {
        const key = this.filterName as keyof Product;
        const find = [...model.getProducts()]
          .map((item) => item[key])
          .sort((a, b) => {
            if (a > b) {
              return 1;
            }
            if (a < b) {
              return -1;
            }
            return 0;
          });
        //console.log(find);
        min = find[0];
        max = find.pop();
      }
    }
   //console.log(min, max);


    this.filterEl.innerHTML = `<div class="card-body d-flex flex-column gap-3 mb-2">
    <h5 class="card-title text-center text-uppercase">Price</h5>
  <div class="d-flex justify-content-between">
  <span class="js-range-min">10</span>
  <span>⟷</span>
  <span class="js-range-max">100</span>
  </div>

    <div class="range">
      <div class="range-slider">
        <span class="range-selected"></span>
      </div>
      <div class="range-input">
        <input type="range" class="min" min="0" max="1000" value="0">
        <input type="range" class="max" min="0" max="1000" value="1000">
      </div>
    </div>
  </div>`;
  }

  init():HTMLDivElement {
    this.render();

    return this.filterEl;
  }
}

export default RangeFilter;
