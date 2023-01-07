import viewBasket from '../view/viewBasket';
import ProductBasket from '../components/ProductBasket';
import {
  promoCodes, usedPromoCodes, dropPromoCode, setQuantityProducts,
  getSummaryProducts, calculationDiscount, getBasket,
} from '../common/basketHelper';

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
    const quantityProducts = Object.keys(getBasket());
    if (target.textContent === '<' && firstProductPage > 1) {
      if (numberPage) {
        const newNumberPage = Number(numberPage.textContent);
        numberPage.textContent = String(newNumberPage - 1);
      }
      const products = setQuantityProducts();
      if (products) {
       //  viewBasket.renderSelectProducts(products);
      }
    } else if (target.textContent === '>' && lastProductPage < quantityProducts.length) {
      if (numberPage) {
        const newNumberPage = Number(numberPage.textContent);
        numberPage.textContent = String(newNumberPage + 1);
      }
      const products = setQuantityProducts();
      if (products) {
        // viewBasket.renderSelectProducts(products);
      }
    }
  }
}

function addPromoCode(e: Event) {
  if (e.target) {
    const target = e.target as HTMLElement;
    const discount = Number(target.parentElement?.children[0].textContent);
    const nameDiscount = target.parentElement?.children[0].id;
    if (nameDiscount !== undefined && !(nameDiscount in usedPromoCodes)) {
      usedPromoCodes[nameDiscount as keyof typeof usedPromoCodes] = discount;
      const elemTotalPrice = document.querySelector('.total-price') as HTMLElement;
      const discountPrice = calculationDiscount();
      if (document.querySelector('.old-price')) {
        const elemNewPrice = document.querySelector('.total-price:not(.old-price) span') as HTMLElement;
        elemNewPrice.textContent = String(discountPrice);
      } else {
        const newPrice = elemTotalPrice.cloneNode(true);
        newPrice.childNodes[1].textContent = String(discountPrice);
        elemTotalPrice.after(newPrice);
        elemTotalPrice.classList.add('old-price');
      }
      viewBasket.renderUsedPromoCode(promoCodes, usedPromoCodes);
      document.querySelectorAll('.del-promo-btn')?.forEach((btn) => {
        btn.addEventListener('click', dropPromoCode);
      });
    }
    document.querySelector('.code-btn')?.remove();
  }
}

function changePromo(e: Event) {
  const target = e.target as HTMLInputElement;
  if (Object.keys(promoCodes).includes(target.value)
   && !(target.value.toLocaleLowerCase() in usedPromoCodes)) {
    const codeText = promoCodes[target.value as keyof typeof promoCodes];
    const codeElement = document.createElement('div');
    codeElement.classList.add('code-btn');
    codeElement.innerHTML = `${codeText}<span class="add-promo-btn btn btn-outline-dark">ADD</span>`;
    document.querySelector('.promo-ex')?.before(codeElement);
    document.querySelector('.add-promo-btn')?.addEventListener('click', addPromoCode);
  } else {
    document.querySelector('.code-btn')?.remove();
  }
}

function addListenerBasket() {
  document.querySelectorAll('.page-numbers .btn').forEach((btn) => {
    btn.addEventListener('click', changePageProducts);
  });
  document.querySelector('.basket-number-items')?.addEventListener('change', (e) => {
    const data = setQuantityProducts(e);
    // if (data) viewBasket.renderSelectProducts(data);
  });
  document.querySelector('.input-promo')?.addEventListener('input', changePromo);
  document.querySelector('.btn-by-now')?.addEventListener('click', () => {
    viewBasket.renderModalCheckout();
    document.querySelector('.popup-backgr')?.addEventListener('click', () => {

    });
  });
}


function initBasket() {
  const sum = getSummaryProducts();
  const products = setQuantityProducts();
  // if (products) viewBasket.renderSelectProducts(products);
  ProductBasket.changeSummary(sum);
  addListenerBasket();
}

function start() {
  initBasket();
}

export default start;
