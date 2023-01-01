import model from '../model/model';
import viewBasket from '../view/viewBasket';
import ProductBasket from '../components/ProductBasket';
import setQuantityProducts from '../common/basketHelper';

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

function changePageProducts(e: Event) {
  if (e.target) {
    const target = e.target as HTMLElement;
    const numberPage = document.querySelector('.page-numbers span');
    const pageProducts = Array();
    document.querySelectorAll('.item-prod .item-i').forEach((el) => {
      pageProducts.push(Number(el.textContent));
    });
    const lastProductPage = Math.max(...pageProducts);
    const firstProductPage = Math.min(...pageProducts);
    if (target.textContent === '<' && firstProductPage > 1) {
      if (numberPage) {
        const newNumberPage = Number(numberPage.textContent);
        numberPage.textContent = String(newNumberPage - 1);
      }
      const products = setQuantityProducts();
      if (products) {
        viewBasket.renderSelectProducts(products);
      }
    } else if (target.textContent === '>' && lastProductPage < model.basket.length) {
      if (numberPage) {
        const newNumberPage = Number(numberPage.textContent);
        numberPage.textContent = String(newNumberPage + 1);
      }
      const products = setQuantityProducts();
      if (products) {
        viewBasket.renderSelectProducts(products);
      }
    }
  }
}

function addListenerPagination() {
  document.querySelectorAll('.page-numbers .btn').forEach((btn) => {
    btn.addEventListener('click', changePageProducts);
  });
  document.querySelector('.basket-number-items')?.addEventListener('change', (e) => {
    const data = setQuantityProducts(e);
    if (data) viewBasket.renderSelectProducts(data);
  });
}

function initBasket() {
  const sum = model.getSummaryProducts();
  const products = setQuantityProducts();
  if (products) viewBasket.renderSelectProducts(products);
  ProductBasket.changeSummary(sum);
  addListenerPagination();
}

function start() {
  checkBasket();
  initBasket();
  // console.log(model.basket);
}

export default start;
