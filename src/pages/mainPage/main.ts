/* eslint-disable import/no-cycle */
import { Products, ProductsRenderCallback, ObjectInterface } from '../../types/products';
import multiFilter, { Options } from '../../common/filter/multiFilter';
import model from '../../model/model';
import view from '../../view/view';
import changeHeaderWiew from '../../view/headerWiew';
import getAside from './aside';
import getProductsSection from './productsSection';
import getProductsContainer from './products';
import { transformUrlToParams } from '../../common/urlHelpers';

const productsRenderCallback = (containerEl: HTMLDivElement): ProductsRenderCallback => {
  const render = (products: Products) => {
    view.renderProducts(products, containerEl);
    view.changeProductsCount(products.length);
  };
  return render;
};

const buildMainPage = (products: Products, options?: ObjectInterface): HTMLDivElement => {
  changeHeaderWiew();

  const pageContainer = document.createElement('div');
  pageContainer.classList.add('row', 'm-2', 'py-3');
  const productsContainer = getProductsContainer(products, options);
  const callback = productsRenderCallback(productsContainer);
  const aside = getAside(callback, options);

  const productsSection = getProductsSection(productsContainer, callback, options);

  pageContainer.append(aside);
  pageContainer.append(productsSection);
  return pageContainer;
};

const mainPage = (searchUrl = ''): HTMLDivElement => {
  const data = model.getProducts();
  if (searchUrl === '') {
    return buildMainPage(data);
  }

  const params = transformUrlToParams(searchUrl);
  const { big, ...options } = params;
  multiFilter.updateAllOptions(options as Options);
  const restoredData = multiFilter.getFilteredData(data);
  options.found = restoredData.length;
  const page = buildMainPage(restoredData, params);

  return page;
};

export default mainPage;
