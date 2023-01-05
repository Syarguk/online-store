import { getBasket } from '../common/basketHelper';

const basketPage = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper-basket', 'd-flex');
  const htmlBasket = `<section class="select-products col-8">
                        <div class="title-page-control d-flex justify-content-between">
                          <h5>Products In Cart</h5>
                          <div class="page-control d-flex">
                            <div class="limit">
                              LIMIT:<input class="basket-number-items" type="number" min="1" max="10" value="3">
                            </div>
                            <div class="page-numbers">
                              PAGE:<button class="prev-page-but btn btn-outline-primary"><</button><span>1</span><button class="next-page-but btn btn-outline-primary">></button>
                            </div>
                          </div>
                        </div>
                        <div class="prod-items vstack gap-0">
                          <div class="item-prod bg-light border d-flex align-items-center">
                            <div class="item-i">1</div>
                            <div class="item-info d-flex ">
                              <img class="img-thumbnail img-descr-prod" alt="..." src="https://i.dummyjson.com/data/products/30/thumbnail.jpg">
                              <div class="item-detail text-center">
                                <h5 class="product-title">Key Holder</h5>
                                <p class="product-description">Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality </p>
                                <div class="product-other d-flex justify-content-around">
                                  <div class="product-other-rating">Rating: 4.92</div>
                                  <div class="product-other-discount">Discount: 3.62%</div>
                                </div>
                              </div>
                            </div>
                            <div class="basket-number-control">
                              <p class="stock-control">Stock: 54</p>
                              <div class="inc-dec-control">
                                <button class="btn btn-outline-secondary">+</button>3<button class="btn btn-outline-secondary">-</button>
                              </div>
                              <div class="amount-control">€120.00</div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <aside class="col-4 d-flex flex-column align-items-center">
                        <h5>Summary</h5>
                        <div class="total-products">
                          Products: 
                          <span>9</span>
                        </div>
                        <div class="total-price">
                          Total:
                          €<span>4,314.00 </span>
                        </div>
                        <div class="promo-code">
                          <input class="input-promo" type="text" placeholder="Enter promo code">
                        </div>
                        <span class="promo-ex">Promo for test: 'Pro1', 'Pro2', 'Pro3'</span>
                        <button class="btn-by-now btn btn-outline-dark">BUY NOW</button>
                      </aside>`;
  const noProducts = `<section class="no-products col-12">
                        <h4>No products in basket</h4>
                      </section>`;
  if (getBasket) {
    wrapper.append(htmlBasket);
  } else {
    wrapper.append(noProducts);
  }
  return wrapper;
};

export default basketPage;
