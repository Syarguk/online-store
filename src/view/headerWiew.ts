import { HeaderWiewArgs } from './../types/view';

const totalCost: HTMLElement | null = document.getElementById('total-cost');
const totalCount: HTMLElement | null = document.getElementById('basket-count');

const headerWiew = ({ cost, count }: HeaderWiewArgs):void => {
  if (totalCost) {
    totalCost.textContent = String(cost);
  }
  if (totalCount) {
    totalCount.textContent = String(count);
  }
};

export default headerWiew;
