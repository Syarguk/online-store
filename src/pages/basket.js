import { getProductsLimit, getProductsFreeCopy, getSummaryProducts } from '../common/basketHelper';
import { setQuantityProducts, changePageProducts, changePromo } from '../view/viewBasketHelper';
import getModalCheckout from '../controller/controllerBasket';
import changeHeaderWiew from '../view/headerWiew';
import model from '../model/model';
import viewBasket from '../view/viewBasket';

const basketPage = () => {
  changeHeaderWiew();
  const limitProductsPage = 3;
  const wrapper = document.createElement('div');
  const section = document.createElement('section');
  wrapper.classList.add('wrapper-basket', 'd-flex');
  const products = getProductsFreeCopy().length > limitProductsPage
    ? getProductsLimit(limitProductsPage) : getProductsFreeCopy();

  const noProducts = `<section class="no-products col-12">
                        <h4>No products in basket</h4>
                      </section>`;
  if (products) {
    const contCards = document.createElement('div');
    const titlePageControl = document.createElement('div');
    const pageControl = document.createElement('div');
    const limitProducts = document.createElement('div');
    const pageNumbers = document.createElement('div');
    const summary = document.createElement('aside');
    const buttonBuyNow = document.createElement('button');

    section.classList.add('select-products', 'col-8');
    contCards.classList.add('prod-items', 'vstack', 'gap-0');
    titlePageControl.classList.add('title-page-control', 'd-flex', 'justify-content-between');
    pageControl.classList.add('page-control', 'd-flex');
    limitProducts.classList.add('limit');
    pageNumbers.classList.add('page-numbers');
    summary.classList.add('col-4', 'd-flex', 'flex-column', 'align-items-center');
    buttonBuyNow.classList.add('btn-by-now', 'btn', 'btn-outline-dark');

    viewBasket.renderSelectProducts(products, contCards);
    limitProducts.innerHTML = 'LIMIT:<input class="basket-number-items" type="number" min="1" max="10" value="3">';
    pageNumbers.innerHTML = 'PAGE:<button class="prev-page-but btn btn-outline-primary"><</button><span>1</span><button class="next-page-but btn btn-outline-primary">></button>';
    summary.innerHTML = `<h5>Summary</h5>
                        <div class="total-products">
                          Products: 
                          <span>${getSummaryProducts()[1]}</span>
                        </div>
                        <div class="total-price">
                          Total:
                          €<span> ${getSummaryProducts()[0]}</span>
                        </div>
                        <div class="promo-code">
                          <input class="input-promo" type="text" placeholder="Enter promo code">
                        </div>
                        <span class="promo-ex">Promo for test: 'Pro1', 'Pro2', 'Pro3'</span>`;
    buttonBuyNow.textContent = 'BUY NOW';

    limitProducts.addEventListener('change', (e) => {
      const data = setQuantityProducts(e);
      viewBasket.renderSelectProductsPage(data);
    });
    pageNumbers.addEventListener('click', changePageProducts);
    summary.addEventListener('input', changePromo);
    buttonBuyNow.addEventListener('click', () => getModalCheckout());

    pageControl.append(limitProducts);
    pageControl.append(pageNumbers);
    titlePageControl.innerHTML = '<h5>Products In Cart</h5>';
    titlePageControl.append(pageControl);
    section.append(titlePageControl);
    section.append(contCards);
    wrapper.append(section);
    summary.append(buttonBuyNow);
    wrapper.append(summary);
    if (model.isOpenPopup) {
      viewBasket.renderModalCheckout();
    }
  } else {
    wrapper.innerHTML = noProducts;
  }
  return wrapper;
};

export default basketPage;

