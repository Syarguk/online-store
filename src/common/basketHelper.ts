import { Products } from '../types/products';
import { HeaderWiewArgs } from '../types/view';

export const getSumAndCount = (basket: Products): HeaderWiewArgs => {
  const count = basket.length;
  const cost = basket.reduce((acc: number, product) => {
    // eslint-disable-next-line no-param-reassign
    acc += product.price;
    return acc;
  }, 0);
  return { count, cost };
};
