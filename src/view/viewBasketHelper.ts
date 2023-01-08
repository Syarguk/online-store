import { Products } from '../types/products';
import { calculationDiscount, getBasket, getProductsForBasket, usedPromoCodes } from '../common/basketHelper';
import viewBasket from './viewBasket';

export const promoCodes = {
  Pro1: 'Code Number-One - <span id="pro1">10</span>% --> ',
  Pro2: 'Code Number-Two - <span id="pro2">20</span>% --> ',
  Pro3: 'Code Number-Three - <span id="pro3">30</span>% --> ',
};

export function dropPromoCode(e: Event) {
  if (e.target) {
    const elBtn = e.target as HTMLElement;
    const elId = elBtn.parentElement?.children[0].id;
    const namePromCode = elId?.slice(0, 4);
    delete usedPromoCodes[namePromCode as keyof typeof usedPromoCodes];
    if (Object.keys(usedPromoCodes).length === 0) {
      elBtn.parentElement?.parentElement?.remove();
      const elemNewPrice = document.querySelector('.total-price:not(.old-price)') as HTMLElement;
      elemNewPrice.remove();
      const elemOldPrice = document.querySelector('.old-price');
      elemOldPrice?.classList.remove('old-price');
    } else {
      elBtn.parentElement?.remove();
      const discountPrice = calculationDiscount();
      const elemNewPriceCost = document.querySelector('.total-price:not(.old-price) span') as HTMLElement;
      elemNewPriceCost.textContent = String(discountPrice);
    }
  }
}

export function addPromoCode(e: Event) {
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

export function changePromo(e: Event) {
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

export function setQuantityProducts(e?: Event): [Products, number] | null {
  const input1 = document.querySelector('.basket-number-items') as HTMLInputElement;
  let quantity = Number(input1.value);
  if (e) {
    const input = e.target as HTMLInputElement;
    quantity = Number(input.value);
  }
  const numberPage = document.querySelector('.page-numbers span')?.textContent;
  if (quantity !== undefined && numberPage !== undefined && numberPage !== null) {
    const startArray = quantity * Number(numberPage) - quantity;
    const endArray = startArray + quantity;
    const prodIdBasket = Object.keys(getBasket());
    const prodIdPage = prodIdBasket.filter((el, index) => index >= startArray && index < endArray);
    const products = getProductsForBasket(prodIdPage);
    if (products) {
      return [products, startArray];
    }
  }
  return null;
}

export function changePageProducts(e: Event) {
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
        viewBasket.renderSelectProductsPage(products);
      }
    } else if (target.textContent === '>' && lastProductPage < quantityProducts.length) {
      if (numberPage) {
        const newNumberPage = Number(numberPage.textContent);
        numberPage.textContent = String(newNumberPage + 1);
      }
      const products = setQuantityProducts();
      if (products) {
        viewBasket.renderSelectProductsPage(products);
      }
    }
  }
}
