// eslint-disable-next-line import/no-cycle
import SortList from '../../components/SortList';
import SearchForm from '../../components/SearchForm';

const getSelectContainer = () => {
  const selectContainer = document.createElement('div');
  selectContainer.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'p-2', 'cards-container', 'align-items-center');
  const sortList = new SortList();

  const prodFound = document.createElement('div');
  prodFound.classList.add('found');
  prodFound.innerHTML = `<span>Found:</span>
  <span id="prodFound">100</span>`;

  const searchForm = new SearchForm();


  selectContainer.append(sortList.init());
  selectContainer.append(prodFound);
  selectContainer.append(searchForm.init());

  return selectContainer;
};

const getProductsSection = (productsContainer: HTMLDivElement) => {
  const productsSection = document.createElement('section');
  productsSection.classList.add('col-8', 'py-2');

  const selectContainer = getSelectContainer();

  productsSection.append(selectContainer);
  productsSection.append(productsContainer);
  return productsSection;
};

export default getProductsSection;
