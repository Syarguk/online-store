/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Products, Product } from '../types/products';
import model from '../model/model';
import { UPC, ObectProductsId, CostAndCount } from '../types/basket';
import viewBasket from '../view/viewBasket';

export function addToStorage(product: Product) {
  const storage = localStorage.getItem('basket');

  if (typeof storage === 'string') {
    const basket = JSON.parse(storage);
    const newBasket = [...basket, product];
    localStorage.setItem('basket', JSON.stringify(newBasket));
  } else {
    localStorage.setItem('basket', JSON.stringify([product]));
  }
}

export function dropFromStorage(id: number): void {
  const storage = localStorage.getItem('basket');

  if (typeof storage === 'string') {
    const basket = JSON.parse(storage);
    let tmp: Products = [];
    for (let i = 0; i < basket.length; i += 1) {
      if (basket[i].id === id) {
        const chunk = basket.slice(i + 1);
        tmp = [...tmp, ...chunk];
        break;
      }
      tmp.push(basket[i]);
    }

    localStorage.setItem('basket', JSON.stringify(tmp));
  }
}

export function getStorage(): Products | null {
  const storage = localStorage.getItem('basket');
  if (typeof storage === 'string') {
    return (JSON.parse(storage));
  }
  return null;
}

export function getCostAndCount(): CostAndCount {
  const result = { cost: 0, count: 0 };
  const basket = getStorage();
  if (Array.isArray(basket) && basket.length > 0) {
    result.count = basket.length;
    // eslint-disable-next-line no-param-reassign
    result.cost = basket.reduce((acc, item: Product) => acc += item.price, 0);
  }
  return result;
}

export const promoCodes = {
  Pro1: 'Code Number-One - <span id="pro1">10</span>% --> ',
  Pro2: 'Code Number-Two - <span id="pro2">20</span>% --> ',
  Pro3: 'Code Number-Three - <span id="pro3">30</span>% --> ',
};

export const usedPromoCodes: UPC = {};

export function getBasket(): ObectProductsId {
  const productsId = Object();
  const storage = getStorage();
  storage?.forEach((product) => {
    if (String(product.id) in productsId) {
      productsId[String(product.id)] += 1;
    } else {
      productsId[String(product.id)] = 1;
    }
  });
  return storage ? productsId : null;
}

export function getProductsFreeCopy() {
  const storage = getStorage();
  const ids = Array();
  const products = storage?.filter((product) => {
    if (!ids.includes(product.id)) {
      ids.push(product.id);
      return true;
    }
    return false;
  });
  return products;
}

export function getProductsForBasket(productsId: string[]): Products | undefined {
  const products = getProductsFreeCopy();
  if (products) {
    return products.filter((product) => productsId.includes(String(product.id)));
  }
}

export function getProductsLimit(limit = 3) {
  const products = getProductsFreeCopy();
  const result = [];
  if (products) {
    for (let i = 0; i < limit; i += 1) {
      result.push(products[i]);
    }
  }
  return result;
}

export function getSummaryProducts(): [cost: number, count: number] {
  const productsIdBasket = getBasket();
  let price = 0;
  model.data.forEach((product) => {
    if (productsIdBasket && String(product.id) in productsIdBasket) {
      const multiplyPrice = product.price * productsIdBasket[String(product.id)];
      price += multiplyPrice;
    }
  });
  const quantity = Object.values(productsIdBasket);
  const quantityProducts = quantity.reduce((acc, quant) => acc + quant, 0);
  return [price, quantityProducts];
}

export function calculationDiscount() {
  const totalPrice = getSummaryProducts()[0];
  const totalDiscount = Object.values(usedPromoCodes).reduce((acc, dis) => acc + dis);
  const discountPrice = totalPrice - ((totalPrice / 100) * totalDiscount);
  return discountPrice;
}

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

export function getModalCheckout() {
  console.log('sdf');
  viewBasket.renderModalCheckout();
  document.querySelector('.popup-backgr')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.popup')) {
      document.querySelector('.popup-backgr')?.remove();
    }
  });
}
