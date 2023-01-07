const filterDataByArrValues = (data, key, options) => {
  const result = data.flatMap((item) => {
    const tmp = [];
    options.forEach((val) => {
      if (item[key] === val) { tmp.push(item); }
    });
    return tmp;
  });
  return result;
};

const initFilterOptions = {
  category: [],
  brand: [],
  search: '',
  price: '',
  stock: '',
  sort: '',
};

const multiFilter = {
  options: initFilterOptions,

  addToMultiOptions(key, value) {
    this.options[key] = [...this.options[key], value];
  },
  dropFromMultiOptions(key, value) {
    this.options[key] = this.options[key].filter((item) => item !== value);
  },
  getMultiOptions(key) {
    return this.options[key];
  },
  changeOption(key, value) {
    this.options[key] = value;
  },
  dropAllOptions() {
    this.options = initFilterOptions;
  },

  getFilteredData(data) {
    let result = data;
    const { category, brand, sort } = this.options;

    if (category.length > 0) {
      result = filterDataByArrValues(result, 'category', category);
    } if (brand.length > 0) {
      result = filterDataByArrValues(result, 'brand', brand);
    } if (typeof sort !== 'string') {
      //console.log(sort);
    result = result.sort(sort);
    }
    // if (search.length > 0) {

    // }
    // console.log(result);
    return result;
  },
};

export default multiFilter;
