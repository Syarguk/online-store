import { HeaderWiewArgs } from './../types/view';

const totalCost: HTMLElement | null = document.getElementById('total-cost');
const totalCount: HTMLElement | null = document.getElementById('basket-count');

const headerWiew = (summaryProd: [cost: number, count: number]):void => {
  const [cost, count] = summaryProd;
  if (totalCost) {
    totalCost.textContent = String(cost);
  }
  if (totalCount) {
    totalCount.textContent = String(count);
  }
};

export default headerWiew;
