import { transformUrlToParams } from '../common/urlHelpers';
import model from '../model/model';

export { transformUrlToParams } from '../common/urlHelpers';

const buildProductPage = (path) => {
  const { id } = transformUrlToParams(path);
  const product = model.getProduct(Number(id));
  //тут делать страницу продукта
  //console.log(product);
  return `product page ${id}`;
};

export default buildProductPage;
