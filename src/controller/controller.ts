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
function getListFields2(): [string, number][] {
  const listFields = Object();
  const nameField = 'brand';
  model.data.forEach((product) => {
    if (product[nameField] in listFields) listFields[product[nameField]] += 1;
    else listFields[product[nameField]] = 1;
  });
  return Object.entries(listFields);
}

function getFilters() {
  view.renderFilters(getListFields());
  view.renderFilters(getListFields2());
}
function start() {
  getFilters();
  view.renderProducts(model.getProducts());
}

export default start;
