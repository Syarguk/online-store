import { Product } from '../types/products';
import model from '../model/model';
import { routes, goTo } from '../rout';
import { getSumAndCount } from '../common/basketHelper';
import headerWiew from '../view/headerWiew';

const changeHeaderWiew = (): void => {
  headerWiew(getSumAndCount(model.getBasket()));
};

type Elements = {
  card: HTMLElement | null;
  addBtn: Element | null;
  dropBtn: Element | null;
};

class ProductCard {
  product: Product;

  elements: Elements = {
    card: null,
    addBtn: null,
    dropBtn: null,
  };

  constructor(product: Product) {
    this.product = product;
  }

  init() {
    this.render();
    this.setBtns();
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
      <button type="button" class="btn btn-primary btn-sm js-basket" data-basket="add">Add to card</button>
      <button type="button" class="btn btn-primary btn-sm js-basket hide" data-basket="drop">Drop from card</button>
      <button type="button" class="btn btn-primary btn-sm">Details</button>
    </div>`;

    this.elements.card = cardEl;
  }

  private setBtns(): void {
    const addBtn = this.elements.card?.querySelector('[data-basket="add"]');
    if (addBtn) {
      this.elements.addBtn = addBtn;
    }
    const dropBtn = this.elements.card?.querySelector('[data-basket="drop"]');
    if (dropBtn) {
      this.elements.dropBtn = dropBtn;
    }
  }

  private attachEvents(): void {
    this.elements.card?.addEventListener('click', (e: Event) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        if (target.matches('.js-basket')) {
          const btnType = target.dataset.basket;
          switch (btnType) {
            case 'add':
              model.addProductToBasket(this.product.id);
              changeHeaderWiew();
              this.elements.addBtn?.classList.add('hide');
              this.elements.dropBtn?.classList.remove('hide');
              break;
            case 'drop':
              model.dropProductFromBasket(this.product.id);
              changeHeaderWiew();
              this.elements.addBtn?.classList.remove('hide');
              this.elements.dropBtn?.classList.add('hide');
              break;

            default:
              throw new Error(`unknow btn type ${btnType}`);
              break;
          }
        } else {
          const path = `${routes.product}id=${this.product.id}`;
          goTo(path);
        }
      }
    });
  }
}

export default ProductCard;
