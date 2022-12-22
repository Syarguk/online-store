import model from '../model/model';
import view from '../view/view';

function getFilters() {
  model.fieldsProduct.forEach((field) => {
    view.renderFilters(model.getListFields(field));
  });
}
function start() {
  view.renderProducts(model.getProducts());
}

export default start;
