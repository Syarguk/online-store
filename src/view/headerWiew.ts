import { CostAndCount } from '../types/basket';
import { getCostAndCount } from '../common/basketHelper';

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

const changeHeaderWiew = (): void => {
  headerWiew(getCostAndCount());
};

export default changeHeaderWiew;
