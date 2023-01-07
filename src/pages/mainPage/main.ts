/* eslint-disable import/no-cycle */
import { Products, ProductsRenderCallback } from '../../types/products';
import model from '../../model/model';
import multiFilter from '../../common/filter/multiFilter';
import view from '../../view/view';
import headerWiew from '../../view/headerWiew';
import { getCostAndCount } from '../../common/basketHelper';
import getAside from './aside';
import getProductsSection from './productsSection';
import getProductsContainer from './products';

const productsRenderCallback = (containerEl: HTMLDivElement): ProductsRenderCallback => {
  const render = (products: Products) => {
    view.renderProducts(products, containerEl);
  };
  return render;
};

const buildMainPage = (products: Products): HTMLElement => {
  headerWiew(getCostAndCount());

  const pageContainer = document.createElement('div');
  pageContainer.classList.add('row', 'm-2', 'py-3');
  const productsContainer = getProductsContainer(products);
  const aside = getAside(productsRenderCallback(productsContainer));

  const productsSection = getProductsSection(productsContainer);

  pageContainer.append(aside);
  pageContainer.append(productsSection);
  return pageContainer;
};

const mainPage = (searchUrl = ''): HTMLElement => {
  let data = model.getProducts();
  if(searchUrl !== '') {
  //some logic
  data = multiFilter.getFilteredData();
  }
  return buildMainPage(data);
};

export default mainPage;
