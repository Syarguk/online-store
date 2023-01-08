import { Product } from './../types/products';
import { transformUrlToParams } from '../common/urlHelpers';
import model from '../model/model';
import changeHeaderWiew from '../view/headerWiew';
// eslint-disable-next-line import/no-cycle
import ProductPageCard from '../components/ProductPageCard';

const getPathSection = (product: Product): HTMLDivElement => {
  const div = document.createElement('div');
  div.classList.add('row', 'my-4');
  div.innerHTML = `
  <div class="col">
    <ul class="list-inline d-flex justify-content-evenly flex-wrap align-items-center text-primary">
      <li class="list-inline-item text-uppercase text-decoration-none fs-2">store</li>
      <li class="list-inline-item">>></li>
      <li class="list-inline-item text-uppercase text-decoration-none fs-2">${product.category}</li>
      <li class="list-inline-item">>></li>
      <li class="list-inline-item text-uppercase text-decoration-none fs-2">${product.brand}</li>
      <li class="list-inline-item">>></li>
      <li class="list-inline-item text-uppercase text-decoration-none fs-2">${product.title}</li>
    </ul>
</div>`;
  return div;
};

const productPage = (path: string): HTMLDivElement => {
  changeHeaderWiew();
  const { id } = transformUrlToParams(path);
  const product = model.getProduct(Number(id));

  const page = document.createElement('div');
  page.classList.add('container', 'text-center');

  const pathSection = getPathSection(product);
  const card = new ProductPageCard(product);

  page.append(pathSection);
  page.append(card.init());
  return page;
};

export default productPage;
