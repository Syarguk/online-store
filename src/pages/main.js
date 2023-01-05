import { filtersName } from '../common/constans';
import { getListFields } from '../common/filtersHelpers';
import { getCostAndCount } from '../common/basketHelper';
import ProductFilter from '../components/ProductFilter';
import AsideButtons from '../components/AsideButtons';
import model from '../model/model';
import headerWiew from '../view/headerWiew';
import view from '../view/view';

const productsRenderCallback = (containerEl) => {
  const render = (products) => {
    //console.log(products);
    view.renderProducts(products, containerEl);
  };
  return render;
};

const mainPage = () => {
  const products = model.getProducts();
  headerWiew(getCostAndCount());

  const pageContainer = document.createElement('div');
  const aside = document.createElement('aside');
  const productsContainer = document.createElement('div');
  const productsSection = document.createElement('section');

  pageContainer.classList.add('row', 'm-2', 'py-3');
  aside.setAttribute('id', 'filters');
  aside.classList.add('col-4');
  productsContainer.classList.add('cards-container', 'd-flex', 'flex-wrap', 'justify-content-center', 'p-2');
  productsSection.classList.add('col-8', 'py-2');

  aside.append(new AsideButtons().init());
  filtersName.forEach((filterName) => {
    const dataForFilter = getListFields(filterName, products);
    const callback = productsRenderCallback(productsContainer);
    const filterEl = new ProductFilter(dataForFilter, filterName, callback);
    aside.append(filterEl.init());
  });



  view.renderProducts(products, productsContainer);
  productsSection.append(productsContainer);

  pageContainer.append(aside);
  pageContainer.append(productsSection);
  return pageContainer;
};

export default mainPage;

const HTML = `
<aside class="col-4" id="filters">

<div class="d-flex justify-content-between flex-wrap buttons">
  <button type="button" class="btn btn-primary">Reset filters</button>
  <button type="button" class="btn btn-primary">Copy link</button>
</div>

<div class="card">
  <div class="card-body pe-0">
    <h5 class="card-title text-center">Category</h5>
    <div class="check-form">
    <div class="form-check me-2">
      <input class="form-check-input" type="checkbox" value="prod1" id="prod2">
      <div class="d-flex justify-content-between">
      <label class="form-check-label" for="prod2">
        category 2
      </label>
      <div class="filter-count">
        <span>5</span>
        <span>/</span>
        <span>6</span>
      </div>
    </div>

  </div>

  </div>
  </div>
</div>

<div class="card">
  <div class="card-body pe-0">
    <h5 class="card-title text-center">Category 2</h5>
    <div class="check-form">
    <div class="form-check me-2">
      <input class="form-check-input" type="checkbox" value="prod1" id="prod2">
      <div class="d-flex justify-content-between">
      <label class="form-check-label" for="prod2">
        category 2
      </label>
      <div class="filter-count">
        <span>5</span>
        <span>/</span>
        <span>6</span>
      </div>
    </div>

  </div>

  </div>
  </div>
</div>

</aside>


<section class="col-8 py-2"
id="products">

<div class="d-flex justify-content-between mb-2">

<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle btn-info" type="button" data-bs-toggle="dropdown" aria-expanded="false">
Sort options
</button>
<ul class="dropdown-menu">
<li><a class="dropdown-item" href="#">Action</a></li>
<li><a class="dropdown-item" href="#">Another action</a></li>
<li><a class="dropdown-item" href="#">Something else here</a></li>
</ul>
</div>

<div class="found">
<span>Found:</span>
<span>100</span>
</div>

<form class="d-flex" role="search">
<input class="form-control me-2" type="search" placeholder="Search product" aria-label="Search">
</form>

<div class="d-flex buttons">
<div class="grid active">
<img src="./assets/icon/icons8-grid-view-64.png" alt=" ">
</div>

<div class="grid">
<img src="./assets/icon/grid.png" alt=" ">
</div>
</div>

</div>

<div class="cards-container d-flex flex-wrap justify-content-center p-2">

  <div class="card">
    <h5 class="card-title text-center mt-1">Card title</h5>
    <img src="https://i.dummyjson.com/data/products/2/1.jpg" class="card-img-top" alt="...">
    <div class="card-body">

      <ul class="list-group list-group-flush">
        <li class="list-group-item p-2">Category: smartphones</li>
        <li class="list-group-item p-2">Brand: Apple</li>
        <li class="list-group-item p-2">A third item</li>
        <li class="list-group-item p-2">An item</li>
        <li class="list-group-item p-2">A second item</li>
        <li class="list-group-item p-2">A third item</li>
      </ul>


      <div class="d-flex justify-content-between flex-wrap">
      <button type="button" class="btn btn-primary btn-sm">Add to card</button>
      <button type="button" class="btn btn-primary btn-sm">Details</button>
    </div>

    </div>

  </div>
  <div class="card">
    <h5 class="card-title text-center mt-1">Card title</h5>
    <img src="https://i.dummyjson.com/data/products/2/1.jpg" class="card-img-top" alt="...">
    <div class="card-body">

      <ul class="list-group list-group-flush">
        <li class="list-group-item p-2">Category: smartphones</li>
        <li class="list-group-item p-2">Brand: Apple</li>
        <li class="list-group-item p-2">A third item</li>
        <li class="list-group-item p-2">An item</li>
        <li class="list-group-item p-2">A second item</li>
        <li class="list-group-item p-2">A third item</li>
      </ul>


      <div class="d-flex justify-content-between flex-wrap">
      <button type="button" class="btn btn-primary btn-sm">Add to card</button>
      <button type="button" class="btn btn-primary btn-sm">Details</button>
    </div>

    </div>

  </div>

<div class="card">
  <h5 class="card-title text-center mt-1">Card title</h5>
  <img src="https://i.dummyjson.com/data/products/2/1.jpg" class="card-img-top" alt="...">
  <div class="card-body">

    <ul class="list-group list-group-flush">
      <li class="list-group-item p-2">Category: smartphones</li>
      <li class="list-group-item p-2">Brand: Apple</li>
      <li class="list-group-item p-2">A third item</li>
      <li class="list-group-item p-2">An item</li>
      <li class="list-group-item p-2">A second item</li>
      <li class="list-group-item p-2">A third item</li>
    </ul>


    <div class="d-flex justify-content-between flex-wrap">
    <button type="button" class="btn btn-primary btn-sm">Add to card</button>
    <button type="button" class="btn btn-primary btn-sm">Details</button>
  </div>

  </div>

</div>
</div>

</section>`;
