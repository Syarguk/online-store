import { ObjectInterface, ProductsRenderCallback } from '../types/products';
import { updateUrl } from '../router/router';
import { routes } from '../common/constans';
import multiFilter from '../common/filter/multiFilter';
import model from '../model/model';

class SearchForm {
  form: HTMLFormElement;

  options?: ObjectInterface;

  callback: ProductsRenderCallback;

  constructor(callback: ProductsRenderCallback, options?: ObjectInterface) {
    this.form = document.createElement('form');
    this.options = options;
    this.callback = callback;
  }

  init(): HTMLFormElement {
    this.form.classList.add('d-flex');
    let value = '';
    if (this.options?.search) {
      value = String(this.options.search);
    }

    this.form.innerHTML = `<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value="${value}">`;
    this.attachEvents();

    return this.form;
  }

  attachEvents() {
    this.form.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const { value } = target;
      multiFilter.changeOption('search', value);
      //if (value.length > 2) {
        const data = multiFilter.getFilteredData(model.getProducts());
        this.callback(data);
     // }
      updateUrl(routes.mainSearch, { search: value });
    });
  }
}

export default SearchForm;
