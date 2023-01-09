/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Products, Product } from '../types/products';
import { UPC, ObectProductsId, CostAndCount } from '../types/basket';
import model from '../model/model';

export const usedPromoCodes: UPC = {};

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

