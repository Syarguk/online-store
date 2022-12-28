const basketPage = `<div class="wrapper-basket d-flex">
<section class="col-8">
  <div class="title-page-control d-flex justify-content-between">
    <h5>Products In Cart</h5>
    <div class="page-control d-flex">
      <div class="limit">
        ITEMS:<input class="basket-number-items">
      </div>
      <div class="page-numbers">
        PAGE:<button class="prev-page-but btn btn-outline-primary"><</button>1<button class="next-page-but btn btn-outline-primary">></button>
      </div>
    </div>
  </div>
  <div class="prod-items vstack gap-0">
    <div class="bg-light border d-flex align-items-center">
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
    <div class="bg-light border">3</div>
    <div class="bg-light border">4</div>
  </div>
</section>
<aside class="col-4 d-flex flex-column align-items-center">
  <h5>Summary</h5>
  <div class="total-products">
    <span>Products:</span>9
  </div>
  <div class="total-price">
    <span>Total:</span> €4,314.00
  </div>
  <div class="promo-code">
    <input type="text" placeholder="Enter promo code">
  </div>
  <span class="promo-ex">Promo for test: 'RS', 'EPM'</span>
  <button class="btn btn-outline-dark">BUY NOW</button>
</aside>
</div>`;

export default basketPage;
