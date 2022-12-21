import { Product } from '../types/products';
import model from '../model/model';
import { routes, goTo } from '../rout';

type Elements = {
  card: HTMLElement | null;
};

class ProductCard {
  product: Product;

  elements: Elements = {
    card: null,
  };

  constructor(product: Product) {
    this.product = product;
  }

  init() {
    this.render();
    this.attachEvents();
    return this.elements.card;
  }

  render(): void {
    const { product } = this;
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.setAttribute('id', String(product.id));
    cardEl.innerHTML = `<h5 class="card-title text-center mt-1">${product.title}</h5>
    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item p-2">Category: ${product.category}</li>
        <li class="list-group-item p-2">Brand: ${product.brand}</li>
        <li class="list-group-item p-2">Price: ${product.price}</li>
        <li class="list-group-item p-2">Discount: ${product.discountPercentage} %</li>
        <li class="list-group-item p-2">Rating: ${product.rating}</li>
        <li class="list-group-item p-2">Stock: ${product.stock}</li>
      </ul>

      <div class="d-flex justify-content-between flex-wrap">
      <button type="button" class="btn btn-primary btn-sm js-basket">Add to card</button>
      <button type="button" class="btn btn-primary btn-sm">Details</button>
    </div>`;

    this.elements.card = cardEl;
  }

  private attachEvents(): void {
    this.elements.card?.addEventListener('click', (e: Event) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        if (target.matches('.js-basket')) {
          // func for add product in basket
          console.log('hi');
        } else {
          const path = `${routes.product}id=${this.product.id}`
          goTo(path)
        }
      }

      // console.log(e.target);
    });
  }
}

export default ProductCard;
