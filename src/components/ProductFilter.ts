type Filter = [string, number];

class ProductFilter {
  constructor(filter: Filter) {
    this.filter = filter;
  }

  filter: Filter;

  render(): HTMLDivElement {
    const filterEl = document.createElement('div');
    filterEl.classList.add('form-check', 'me-2');
    filterEl.innerHTML = `<input class="form-check-input" type="checkbox" value="prod1" id="prod2">
                            <div class="d-flex justify-content-between">
                              <label class="form-check-label" for="prod2">${this.filter[0]}</label>
                              <div class="filter-count">
                                <span>5</span>
                                <span>/</span>
                                <span>${this.filter[1]}</span>
                              </div>
                            </div>`;
    return filterEl;
  }
}
export default ProductFilter;
