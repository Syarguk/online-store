/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Products } from '../types/products';
import model from '../model/model';
import { UPC, ObectProductsId } from '../types/basket';


function add(product: Product) {
  const storage = localStorage.getItem('basket');

  if (typeof storage === 'string') {
    const basket = JSON.parse(storage);
    const newBasket = [...basket, product];
    localStorage.setItem('basket', JSON.stringify(newBasket));
  } else {
    localStorage.setItem('basket', JSON.stringify([product]));
  }
}

function drop(id: number): void {
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

function getStorage(): Products | null {
  const storage = localStorage.getItem('basket');
  if (typeof storage === 'string') {
    return (JSON.parse(storage));
  }
  return null;
}

export const promoCodes = {
  Pro1: 'Code Number-One - <span id="pro1">10</span>% --> ',
  Pro2: 'Code Number-Two - <span id="pro2">20</span>% --> ',
  Pro3: 'Code Number-Three - <span id="pro3">30</span>% --> ',
};

export const usedPromoCodes: UPC = {};

export function getBasket(): ObectProductsId {
  const storage = localStorage.getItem('products-id');
  return storage ? JSON.parse(storage) : null;
}

export function addToBasket(productId: number) {
  const storage = localStorage.getItem('products-id');
  if (storage) {
    const productsBasketId = JSON.parse(storage);
    if (String(productId) in productsBasketId) {
      productsBasketId[String(productId)] += 1;
    } else {
      productsBasketId[String(productId)] = 1;
    }
    localStorage.setItem('products-id', JSON.stringify(productsBasketId));
  } else {
    const newBasket = Object();
    newBasket[productId] = 1;
    localStorage.setItem('products-id', JSON.stringify(newBasket));
  }
}

export function takeFromBasket(productId: number) {
  const storage = localStorage.getItem('products-id');
  if (storage) {
    const productsBasketId = JSON.parse(storage);
    if (String(productId) in productsBasketId) {
      if (productsBasketId[String(productId)] > 1) {
        productsBasketId[String(productId)] -= 1;
      } else {
        delete productsBasketId[String(productId)];
      }
      localStorage.setItem('products-id', JSON.stringify(productsBasketId));
    }
  }
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
    const products = model.getProductsForBasket(prodIdPage);
    return [products, startArray];
  }
  return null;
}
