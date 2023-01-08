class SearchForm {
  form: HTMLFormElement;

  constructor() {
    this.form = document.createElement('form');
  }

  init(): HTMLFormElement {
    this.form.classList.add('d-flex');
    this.form.innerHTML = '<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">';

    return this.form;
  }
}

export default SearchForm;
