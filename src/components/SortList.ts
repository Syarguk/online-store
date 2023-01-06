import { Products, Product } from '../types/products';
import filterStrategue from '../common/filter';

const getSortingFuncASC = (key: keyof Product) => {
  const sortASC = (prod: Product, nextProd: Product) => {
    //console.log(prod, nextProd);

    if (prod[key] < nextProd[key]) {
      return -1;
    }
    if (prod[key] > nextProd[key]) {
      return 1;
    }
    return 0;
  };
  return sortASC;
};

const getSortingFuncDESC = (key: keyof Product) => {
  const sortASC = (prod: Product, nextProd: Product) => {
    if (prod[key] > nextProd[key]) {
      return -1;
    }
    if (prod[key] < nextProd[key]) {
      return 1;
    }
    return 0;
  };
  return sortASC;
};
//проверіть сортіровку по возрастанію
const sortingFunctions = {
  priceASC: getSortingFuncASC('price'),
  priceDESC: getSortingFuncDESC('price'),
  discountASC: getSortingFuncASC('discountPercentage'),
  discountDESC: getSortingFuncDESC('discountPercentage'),
  remove: '',
};

class SortList {
  containerEl: HTMLDivElement;

  products: Products;

  constructor(products: Products) {
    this.containerEl = document.createElement('div');
    this.products = products;
  }

  init(): HTMLDivElement {
    this.render();
    this.attachEvents();

    return this.containerEl;
  }

  render():void {
    this.containerEl.classList.add('dropdown');
    const html = `
    <div class="d-grid">
    <button class="btn btn-secondary btn-info dropdown-toggle" type="button">
    Sort options
    </button>
    <ul class="sort-list hide">
    <li class="sort-item" data-sort="priceASC">Sort by price ASC</li>
    <li class="sort-item" data-sort="priceDESC">Sort by price DESC</li>
    <li class="sort-item" data-sort="discountASC">Sort by discount ASC</li>
    <li class="sort-item" data-sort="discountDESC">Sort by discount DESC</li>
    <li class="sort-item" data-sort="remove">Remove sorting</li>
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
        //console.log(sortType);
        if (sortType) {
          filterStrategue.addValue('sort', sortingFunctions[sortType]);
          filterStrategue.filterData(this.products);
        }


        const btn = this.containerEl.querySelector('.dropdown-toggle');
        const text = sortType !== 'remove' ? target.textContent : 'Sort options';

        if (text) {
          btn?.textContent = text;
        }
      }
      const list = this.containerEl.querySelector('.sort-list');
      list?.classList.toggle('hide');
    });
  }
}

export default SortList;
