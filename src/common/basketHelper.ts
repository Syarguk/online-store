import { Products } from '../types/products';
import { HeaderWiewArgs } from '../types/view';
import model from '../model/model';

export const getSumAndCount = (basket: Products): HeaderWiewArgs => {
  const count = basket.length;
  const cost = basket.reduce((acc: number, product) => {
    // eslint-disable-next-line no-param-reassign
    acc += product.price;
    return acc;
  }, 0);
  return { count, cost };
};

function setQuantityProducts(e?: Event): [Products, number] | null {
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
    const products = model.basket.filter((prod, index) => index >= startArray && index < endArray);
    return [products, startArray];
  }
  return null;
}
export default setQuantityProducts;
