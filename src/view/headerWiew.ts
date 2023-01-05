import { CostAndCount } from '../types/basket';

const totalCost: HTMLElement | null = document.getElementById('total-cost');
const totalCount: HTMLElement | null = document.getElementById('basket-count');

const headerWiew = ({ cost, count }:CostAndCount):void => {
  if (totalCost) {
    totalCost.textContent = String(cost);
  }
  if (totalCount) {
    totalCount.textContent = String(count);
  }
};

export default headerWiew;
