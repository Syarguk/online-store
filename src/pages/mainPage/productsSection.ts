// eslint-disable-next-line import/no-cycle
import SortList from '../../components/SortList';
import SearchForm from '../../components/SearchForm';
import { ObjectInterface } from '../../types/products';
import { routes } from '../../common/constans';
import { updateUrl } from '../../router/router';
import view from '../../view/view';
import gridS from '../../assets/icon/grid.png';
import giridL from '../../assets/icon/icons8-grid-view-64.png'


const getViewProductSwitch = (whatActive: string | undefined = 'true'): HTMLDivElement => {

  const isBigActive = whatActive === 'true' ? true : false;

const div = document.createElement('div');
div.classList.add('d-flex', 'buttons');
div.innerHTML = `<div class="grid ${isBigActive ?'active' : ''}">
<img src="${giridL}" alt=" " class="js-grid" data-grid="true">
</div>
<div class="grid ${!isBigActive ? 'active' : ''}">
<img src="${gridS}" alt=" " class="js-grid" data-grid="false">
</div>`

div.addEventListener('click', (e) => {
  const target = e.target as HTMLElement

  if (target.matches('.js-grid')) {
    const isBig = target.dataset.grid
    view.changeProductView();
    const param = {big: ''}
    if (isBig) {
      param.big = isBig
    }

updateUrl(routes.mainSearch, param);
  }
})

return div;
}

const getSelectContainer = (options?: ObjectInterface) => {

  const selectContainer = document.createElement('div');
  selectContainer.classList.add('d-flex', 'flex-wrap', 'justify-content-around', 'p-2', 'gap-2', 'align-items-center');
  const sortList = new SortList(options);

  const prodFound = document.createElement('div');
  prodFound.classList.add('found');
  const found = options?.found ? options.found : '100';
  prodFound.innerHTML = `<span>Found:</span>
  <span id="prodFound">${found}</span>`;

  const searchForm = new SearchForm();


  selectContainer.append(sortList.init());
  selectContainer.append(prodFound);
  selectContainer.append(searchForm.init());
  selectContainer.append(getViewProductSwitch(String(options?.big)));

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
