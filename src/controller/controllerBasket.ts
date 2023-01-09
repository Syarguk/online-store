import viewBasket from '../view/viewBasket';

function getModalCheckout() {
  viewBasket.renderModalCheckout();
  document.querySelector('.popup-backgr')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('.popup-backgr')) {
      document.querySelector('.popup-backgr')?.remove();
    }
  });
}

export default getModalCheckout;
