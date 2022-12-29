import model from '../model/model';
import viewBasket from '../view/viewBasket';

function initBasket() {
  viewBasket.renderSelectProducts(model.basket);
}

function checkBasket() {
  const storage = localStorage.getItem('products-id');
  if (storage) {
    const productId = Object.keys(JSON.parse(storage));
    model.basketInStorage = JSON.parse(storage);
    productId.forEach((id: string) => {
      model.addProductToBasket(Number(id));
    });
  }
}

function start() {
  checkBasket();
  initBasket();
  // console.log(model.basket);
}

export default start;
