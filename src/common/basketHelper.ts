/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Products } from '../types/products';
import model from '../model/model';

interface ObectProductsId {
  [index: string]: number;
}

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
    const products = model.getProducts1(prodIdPage);
    return [products, startArray];
  }
  return null;
}
