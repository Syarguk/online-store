import { getProductsLimit, setQuantityProducts, changePageProducts } from '../common/basketHelper';
import viewBasket from '../view/viewBasket';

const basketPage = () => {
  const wrapper = document.createElement('div');
  const section = document.createElement('section');
  wrapper.classList.add('wrapper-basket', 'd-flex');
  const products = getProductsLimit();

  const noProducts = `<section class="no-products col-12">
                        <h4>No products in basket</h4>
                      </section>`;
  if (products) {
    const contCards = document.createElement('div');
    const titlePageControl = document.createElement('div');
    const pageControl = document.createElement('div');
    const limitProducts = document.createElement('div');
    const pageNumbers = document.createElement('div');

    section.classList.add('select-products', 'col-8');
    contCards.classList.add('prod-items', 'vstack', 'gap-0');
    titlePageControl.classList.add('title-page-control', 'd-flex', 'justify-content-between');
    pageControl.classList.add('page-control', 'd-flex');
    limitProducts.classList.add('limit');
    pageNumbers.classList.add('page-numbers');
    viewBasket.renderSelectProducts(products, contCards);
    limitProducts.innerHTML = 'LIMIT:<input class="basket-number-items" type="number" min="1" max="10" value="3">';
    pageNumbers.innerHTML = 'PAGE:<button class="prev-page-but btn btn-outline-primary"><</button><span>1</span><button class="next-page-but btn btn-outline-primary">></button>';
    limitProducts.addEventListener('change', (e) => {
      console.log('sdf');
      const data = setQuantityProducts(e);
      viewBasket.renderSelectProductsPage(data);
    });
    pageNumbers.addEventListener('click', changePageProducts);
    pageControl.append(limitProducts);
    pageControl.append(pageNumbers);
    titlePageControl.innerHTML = '<h5>Products In Cart</h5>';
    titlePageControl.append(pageControl);
    section.append(titlePageControl);
    section.append(contCards);
    wrapper.append(section);
  } else {
    wrapper.innerHTML = noProducts;
  }
  return wrapper;
};

export default basketPage;
