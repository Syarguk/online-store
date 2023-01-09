/* eslint-disable import/no-cycle */
import ProductCard, { isDropBtn } from './ProductCard';
import { goToPath } from '../router/router';
import { routes } from '../common/constans';
import { addToStorage } from '../common/basketHelper';
import model from '../model/model';

class ProductPageCard extends ProductCard {
  render(): void {
    this.cardEl.classList.add('container', 'text-center', 'border', 'rounded-3', 'border-primary', 'row', 'p-3', 'mb-2');

    this.cardEl.innerHTML = `<p class="fs-3 text-uppercase">${this.product.title}</p>`;
    const imgBuyDiv = document.createElement('div');
    imgBuyDiv.classList.add('col', 'gap-4', 'd-flex', 'flex-column', 'justify-content-center', 'aling-items-center');
    imgBuyDiv.append(this.getImageSection());
    imgBuyDiv.append(this.getPayDiv());
    this.cardEl.append(imgBuyDiv);
    this.cardEl.append(this.getList());
  }

  private getImageSection(): HTMLDivElement {
    const { images } = this.product;
    const div = document.createElement('div');
    div.classList.add('row');
    const imgHtml = images.slice(1).map((img) => `<div><img src="${img}" class="img-thumbnail" alt=" "></div>`);
    const startStr = `<div class="col-3">${imgHtml.join('')}</div>`;
    const finishStr = `<div class="col"><img src="${images[0]}" class="rounded img-thumbnail" alt=" ">
</div>`;
    div.innerHTML = `${startStr}${finishStr}`;

    div.addEventListener('click', (e) => {
      const mainImg = div.querySelector('.rounded') as HTMLImageElement;
      const mainSrc = mainImg.src;
      const nextImg = e.target as HTMLImageElement;
      if (nextImg?.src) {
        const nextSrc = nextImg.src;
        nextImg.setAttribute('src', mainSrc);
        mainImg.setAttribute('src', nextSrc);
      }
    });
    return div;
  }

  private getPayDiv(): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('row');
    const col = document.createElement('div');
    col.classList.add('col', 'd-flex', 'flex-column', 'justify-content-center', 'aling-items-center', 'gap-2');

    const cost = document.createElement('p');
    cost.classList.add('h3');
    cost.textContent = `${this.product.price} €`;
    col.append(cost);
    col.append(this.getBtn());

    const byuBtn = document.createElement('button');
    byuBtn.classList.add('btn', 'btn-primary');
    byuBtn.textContent = 'BUY NOW';
    byuBtn.addEventListener('click', () => {
      if (!isDropBtn(this.product.id)) {
        addToStorage(this.product);
      }
      model.isOpenPopup = true;

      goToPath(routes.basket);
    });

    col.append(byuBtn);

    div.append(col);

    return div;
  }

  private getList(): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `<div class="vstack gap-2">
        <div class="bg-light border rounded-3">
          <h5 class="bg-info">Description:</h5>
          <p>${this.product.description}</p>
        </div>
        <div class="bg-light border rounded-3">
        <h5 class="bg-info">Price:</h5>
        <p>${this.product.price} €</p>
      </div>
        <div class="bg-light border rounded-3">
          <h5 class="bg-info">Discount Percentage:</h5>
          <p>${this.product.discountPercentage} %</p>
        </div>
        <div class="bg-light border rounded-3">
          <h5 class="bg-info">Rating:</h5>
          <p>${this.product.rating}</p>
        </div>
        <div class="bg-light border rounded-3">
          <h5 class="bg-info">Stock:</h5>
          <p>${this.product.stock}</p>
        </div>
        <div class="bg-light border rounded-3">
          <h5 class="bg-info">Brand:</h5>
          <p>${this.product.brand}</p>
        </div>
        <div class="bg-light border rounded-3">
          <h5 class="bg-info">Category:</h5>
          <p>${this.product.category}</p>
        </div>
      </div>`;
    return div;
  }
}

export default ProductPageCard;
