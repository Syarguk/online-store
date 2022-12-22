import model from '../model/model';
import view from '../view/view';

function start() {
  view.renderProducts(model.getProducts());
}

export default start;
