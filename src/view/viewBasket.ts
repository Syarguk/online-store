import { ViewBasket } from '../types/view';
import ProductBasket from '../components/ProductBasket';
import { UPC, ProCod } from '../types/basket';

const viewBasket: ViewBasket = {
  renderSelectProductsPage(data) {
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
  },

  renderSelectProducts(data, cardsContainer) {
    data.forEach((product, index) => {
      const productCard = new ProductBasket(product, index + 1);
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

  checkInput(e) {
    if (e.target) {
      /* const target = e.target as HTMLInputElement;
      const form = document.querySelector('.needs-validation') as HTMLFormElement;
      const name = document.querySelector('.input-name') as HTMLInputElement;
      const namef = document.getElementById('#namef');
      form?.addEventListener('submit', () => {
        if (name.value.length === 0) {
          if (namef) namef.innerHTML = 'Required field';
        return false;
        }
      }); */
    }
  },

  renderModalCheckout() {
    const formFields = [
      '<input class="input-name form-control" name="name" placeholder="Name" required>',
      '<input class="input-phone form-control" name="phone" placeholder="Phone number" type="tel" required>',
      '<input class="input-address form-control" name="address" placeholder="Delivery address" required>',
      '<input class="input-email form-control"  name="email" placeholder="E-mail" type="email" required>'];
    const backgrPopup = document.createElement('div');
    backgrPopup.classList.add('popup-backgr');
    const popup = document.createElement('form');
    popup.classList.add('popup', 'needs-validation');
    // popup.setAttribute('novalidate', '');
    popup.setAttribute('name', 'formpd');
    popup.innerHTML = '<h5>Personal details</h5>';
    formFields.forEach((element) => {
      const field = document.createElement('div');
      field.classList.add('mb-3');
      field.innerHTML = `${element}`;
      popup.append(field);
    });
    popup.innerHTML += '<h5>Credit card details</h5>';
    const cardData = document.createElement('div');
    cardData.classList.add('card-data');
    const cardDataHtml = `<div class="number">
                            <input class="input-number form-control" name="number-card" placeholder="Card number">
                          </div>
                          <div class="other-data">
                            <div class="valid-data">
                              VALID: <input class="input-data form-control" name="data-card" placeholder="Valid Thru">
                            </div>
                            <div class="cv-data">
                              CVV: <input class="input-cvv form-control" name="cvv-card" placeholder="Code">
                            </div>
                          </div>`;
    cardData.innerHTML = cardDataHtml;
    popup.append(cardData);
    popup.addEventListener('change', this.checkInput);
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('btn', 'btn-outline-primary');
    confirmBtn.setAttribute('type', 'submit');
    confirmBtn.textContent = 'CONFIRM';
    popup.append(confirmBtn);
    backgrPopup.append(popup);
    document.body.append(backgrPopup);
  },
};

export default viewBasket;
