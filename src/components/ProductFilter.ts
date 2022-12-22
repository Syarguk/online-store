type Filter = {
  fild: string;
  quantity: number;
};

class ProductFilter {
  constructor(filter: Filter) {
    this.filter = filter;
  }

  filter: Filter;

  render(): HTMLDivElement {
    const filterEl = document.createElement('div');
    filterEl.classList.add('card');
    filterEl.innerHTML = `<div class="check-form">
                            <div class="form-check me-2">
                              <input class="form-check-input" type="checkbox" value="prod1" id="prod2">
                              <div class="d-flex justify-content-between">
                                <label class="form-check-label" for="prod2">${this.filter.fild}</label>
                                <div class="filter-count">
                                  <span>5</span>
                                  <span>/</span>
                                  <span>${this.filter.quantity}</span>
                                </div>
                              </div>
                            </div>
                          </div>`;
    return filterEl;
  }
}
export default ProductFilter;
