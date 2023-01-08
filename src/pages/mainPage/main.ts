/* eslint-disable import/no-cycle */
import { Products, ProductsRenderCallback, ObjectInterface  } from '../../types/products';
import model from '../../model/model';
import multiFilter from '../../common/filter/multiFilter';
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

  //console.log(options);

  const pageContainer = document.createElement('div');
  pageContainer.classList.add('row', 'm-2', 'py-3');
  const productsContainer = getProductsContainer(products, options);
  const aside = getAside(productsRenderCallback(productsContainer), options);

  const productsSection = getProductsSection(productsContainer, options);

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
  const options = {...params};
  if (params.big) {
    delete params.big;
  }
  multiFilter.updateAllOptions(params);
  const restoredData = multiFilter.getFilteredData(data);
  options.found = restoredData.length;
  const page = buildMainPage(restoredData, options);
 // view.restorePageView(restoredData);
  //console.log(viewProdCard);


  // some logic
  // data = multiFilter.getFilteredData();
  //data = model.getProducts();
  return page;
};

export default mainPage;
