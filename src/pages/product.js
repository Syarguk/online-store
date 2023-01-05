import { transformUrlToParams } from '../common/urlHelpers';
import model from '../model/model';
import productDesc from './product-desc';

export { transformUrlToParams } from '../common/urlHelpers';

const buildProductPage = (path) => {
  const { id } = transformUrlToParams(path);
  const product = model.getProduct(id);
  // console.log(product);
  // return `product page ${id}`;
  return productDesc;
};

export default buildProductPage;
