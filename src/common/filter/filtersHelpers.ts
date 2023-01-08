import { ObjectForFilter, Products, Product } from '../../types/products';

const getListFields = (nameField: string, products: Products): ObjectForFilter => {
  const tmp: ObjectForFilter = {};

  products.forEach((product: Product) => {
    const value = product[nameField as keyof Product];
    if (!Array.isArray(value)) {
      tmp[value] = tmp[value] ? tmp[value] + 1 : 1;
    }
  });
  return tmp;
};

export default getListFields;
