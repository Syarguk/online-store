// eslint-disable-next-line import/no-cycle
import SortList from '../../components/SortList';
import SearchForm from '../../components/SearchForm';
import { ObjectInterface } from '../../types/products';

const getSelectContainer = (options?: ObjectInterface) => {

  const selectContainer = document.createElement('div');
  selectContainer.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'p-2', 'cards-container', 'align-items-center');
  const sortList = new SortList(options);

  const prodFound = document.createElement('div');
  prodFound.classList.add('found');
  const found = options?.found ? options.found : '';
  prodFound.innerHTML = `<span>Found:</span>
  <span id="prodFound">${found}</span>`;

  const searchForm = new SearchForm();


  selectContainer.append(sortList.init());
  selectContainer.append(prodFound);
  selectContainer.append(searchForm.init());

  return selectContainer;
};

const getProductsSection = (productsContainer: HTMLDivElement, options?: ObjectInterface) => {


  const productsSection = document.createElement('section');
  productsSection.classList.add('col-8', 'py-2');

  const selectContainer = getSelectContainer(options);

  productsSection.append(selectContainer);
  productsSection.append(productsContainer);
  return productsSection;
};

export default getProductsSection;
