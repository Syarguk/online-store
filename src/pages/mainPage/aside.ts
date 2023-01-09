import { Product, ProductsRenderCallback, ObjectInterface } from '../../types/products';
import { filtersName, rangeFilterNames } from '../../common/constans';
import AsideButtons from '../../components/AsideButtons';
import getListFields from '../../common/filter/filtersHelpers';
import ProductFilter from '../../components/ProductFilter';
import RangeFilter from '../../components/ProductRangeFilter';
import model from '../../model/model';

const getAside = (callback: ProductsRenderCallback, options?: ObjectInterface) => {
  const aside = document.createElement('aside');
  aside.setAttribute('id', 'filters');
  aside.classList.add('col-4');

  aside.append(new AsideButtons().init());

  filtersName.forEach((filterName) => {
    const products = model.getProducts();
    const dataForFilter = getListFields(filterName, products);
    const filterEl = new ProductFilter(dataForFilter, filterName, callback, options);
    aside.append(filterEl.init());
  });

  rangeFilterNames.forEach((filterName) => {
    const randeFilter = new RangeFilter(filterName, callback, options);
    aside.append(randeFilter.init());
  });

  return aside;
};

export default getAside;
