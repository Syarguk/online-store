import { ObjectForFilter, Products } from '../types/products';

export const getListFields = (nameField: string, products: Products): ObjectForFilter => {
  const tmp: ObjectForFilter = {};

  products.forEach((product) => {
    const value = product[nameField];
    tmp[value] = tmp[value] ? tmp[value] + 1 : 1;
  });
  return tmp;
};

export const y = '';
