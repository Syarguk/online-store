import { ViewBasket } from '../types/view';
import ProductBasket from '../components/ProductBasket';
import { UPC, ProCod } from '../types/basket';

const viewBasket: ViewBasket = {
  /* renderSelectProducts(data) {
    const [products, startIndex] = data;
    const cards = document.querySelectorAll('.prod-items .item-prod');
    if (cards) {
      cards.forEach((el) => el.remove());
    }
    const cardsContainer = document.querySelector('.select-products .prod-items');
    products.forEach((product, index) => {
      const productCard = new ProductBasket(product, index + startIndex + 1);
      cardsContainer?.append(productCard.init() as HTMLElement);
    });
  }, */

  renderSelectProducts(data, cardsContainer) {
    data.forEach((product) => {
      const productCard = new ProductBasket(product, 2);
      cardsContainer?.append(productCard.init() as HTMLElement);
    });
  },

  renderUsedPromoCode(prCodes: ProCod, usdPrCodes: UPC) {
    if (document.querySelector('.appl-codes')) document.querySelector('.appl-codes')?.remove();
    const appleCodes = document.createElement('div');
    appleCodes.classList.add('appl-codes');
    appleCodes.innerHTML = '<h5>Appled codes</h5>';
    Object.keys(usdPrCodes).forEach((key) => {
      const nameKey = key[0].toUpperCase() + key.slice(1);
      const codeDesc = prCodes[nameKey as keyof typeof prCodes];
      const strIndex = codeDesc.indexOf('">');
      const newCodeDescr = `${codeDesc.slice(0, strIndex)}n">${codeDesc.slice(strIndex + 2)}`;
      const prCodeBtn = document.createElement('div');
      prCodeBtn.classList.add('code-appl-btn');
      prCodeBtn.innerHTML = `${newCodeDescr}<span class="del-promo-btn btn btn-outline-dark">DROP</span>`;
      appleCodes.append(prCodeBtn);
    });
    document.querySelector('.promo-code')?.before(appleCodes);
  },

  renderModalCheckout() {
    const backgrPopup = document.createElement('div');
    backgrPopup.classList.add('popup-backgr');
    const popup = document.createElement('div');
    popup.classList.add('popup');
    backgrPopup.append(popup);
    document.body.append(backgrPopup);
  },
};

export default viewBasket;
