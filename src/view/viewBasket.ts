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
    console.log('sdfsdf');
    const elError = document.querySelectorAll('.error');
    elError.forEach((element) => element.textContent = '');
    const name = document.querySelector('.input-name') as HTMLInputElement;
    const phone = document.querySelector('.input-phone') as HTMLInputElement;
    const address = document.querySelector('.input-address') as HTMLInputElement;
    const email = document.querySelector('.input-email') as HTMLInputElement;
    const nameText = name.value.trim();
    const phoneText = name.value.trim();
    const addressText = name.value.trim();
    const emailText = name.value.trim();
    const nameError = document.querySelector('.name-error') as HTMLInputElement;
    const phoneError = document.querySelector('.phone-error') as HTMLInputElement;
    const addressError = document.querySelector('.address-error') as HTMLInputElement;
    const emailError = document.querySelector('.email-error') as HTMLInputElement;
    if (!(nameText.indexOf(' ') !== -1 && nameText.length >= 7)) {
      nameError.textContent = 'Error';
    }
    // if (!(phoneText[0] === '+' && phoneText.length >= 9 && parseInt(phoneText.slice(1), 10))) {
    if ((phoneText[0] === '+')) {
      phoneError.textContent = 'Error';
    }
    e.preventDefault();
    /* const target = e.target as HTMLInputElement;
      const form = document.querySelector('.needs-validation') as HTMLFormElement;
      const name = document.querySelector('.input-name') as HTMLInputElement;
      const namef = document.getElementById('#namef');
      }); */
  },

  renderModalCheckout() {
    const formFields = [
      '<input class="input-name form-control" name="name" placeholder="Name" required><span class="name-error error"></span>',
      '<input class="input-phone form-control" name="phone" placeholder="Phone number" type="tel"><span class="phone-error error"></span>',
      '<input class="input-address form-control" name="address" placeholder="Delivery address"><span class="address-error error"></span>',
      '<input class="input-email form-control"  name="email" placeholder="E-mail" type="email"><span class="email-error error"></span>'];
    const backgrPopup = document.createElement('div');
    backgrPopup.classList.add('popup-backgr');
    const popup = document.createElement('form');
    popup.classList.add('popup', 'needs-validation');
    popup.setAttribute('novalidate', '');
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
    popup.addEventListener('submit', this.checkInput);
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
