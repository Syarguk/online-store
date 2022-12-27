import model from '../model/model';
import view from '../view/view';

function getListFields(): [string, number][] {
  const listFields = Object();
  const nameField = 'category';
  model.data.forEach((product) => {
    if (product[nameField] in listFields) listFields[product[nameField]] += 1;
    else listFields[product[nameField]] = 1;
  });
  return Object.entries(listFields);
}

function getFilters() {
  view.renderFilters(getListFields());
}

function getSelectFilter() {
  const filterCategory = document.querySelectorAll('#filters .form-check-input');
  filterCategory.forEach((el) => {
    if ((el as HTMLInputElement).checked) {
      const category = el.parentElement?.children[1].children[0].textContent;
      model.getFilterProducts(category);
    }
  });
  view.renderProducts(model.getProducts());
  model.filteredData = [];
}

function addListenerFilter() {
  document.querySelectorAll('#filters .form-check').forEach((el) => {
    el.addEventListener('change', () => getSelectFilter());
  });
}

function initBasket() {}

function start() {
  getFilters();
  addListenerFilter();
  view.renderProducts(model.getProducts());
}

export default start;
