import { ProductsRenderCallback } from './../types/products';
import { ObjectInterface } from '../types/products';
import multiFilter from '../common/filter/multiFilter';
import model from '../model/model';
// eslint-disable-next-line import/no-cycle
import { updateUrl } from '../router/router';
import { routes } from '../common/constans';

class SortList {
  containerEl: HTMLDivElement;

  callback: ProductsRenderCallback;

  options?: ObjectInterface;

  constructor(callback: ProductsRenderCallback, options?: ObjectInterface) {
    this.containerEl = document.createElement('div');
    this.options = options;
    this.callback = callback;
  }

  init(): HTMLDivElement {
    this.render();
    this.attachEvents();

    return this.containerEl;
  }

  render():void {
    this.containerEl.classList.add('dropdown');

    let btnName = 'Sort options';
    if (this.options?.sort) {
      const names: { [key:string]: string } = {
        priceASC: 'Sort by price ASC',
        priceDESC: 'Sort by price DESC',
        discountASC: 'Sort by discount ASC',
        discountDESC: 'Sort by discount DESC',
      };

      if (typeof this.options?.sort === 'string') {
        btnName = names[this.options?.sort];
      }
    }
    const html = `
    <div class="d-grid">
    <button class="btn btn-secondary btn-info dropdown-toggle" type="button">
    ${btnName}
    </button>
    <ul class="sort-list hide">
    <li class="sort-item" data-sort="priceASC">Sort by price ASC</li>
    <li class="sort-item" data-sort="priceDESC">Sort by price DESC</li>
    <li class="sort-item" data-sort="discountASC">Sort by discount ASC</li>
    <li class="sort-item" data-sort="discountDESC">Sort by discount DESC</li>
    </ul>
</div>
`;
    this.containerEl.innerHTML = html;
  }

  private attachEvents(): void {
    this.containerEl.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.matches('.sort-item')) {
        const sortType = target.dataset.sort;
        if (sortType) {
          multiFilter.changeOption('sort', sortType);
          this.callback(multiFilter.getFilteredData(model.getProducts()));
          updateUrl(routes.mainSearch, { sort: sortType });
        }
        const btn = this.containerEl.querySelector('.dropdown-toggle');
        const text = sortType !== 'remove' ? target.textContent : 'Sort options';

        if (text && btn) {
          btn.textContent = text;
        }
      }
      const list = this.containerEl.querySelector('.sort-list');
      list?.classList.toggle('hide');
    });
  }
}

export default SortList;
