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

const getSortingFuncASC = (key) => {
  const sortASC = (prod, nextProd) => {
    // console.log(prod, nextProd);

    if (prod[key] < nextProd[key]) {
      return -1;
    }
    if (prod[key] > nextProd[key]) {
      return 1;
    }
    return 0;
  };
  return sortASC;
};

const getSortingFuncDESC = (key) => {
  const sortASC = (prod, nextProd) => {
    if (prod[key] > nextProd[key]) {
      return -1;
    }
    if (prod[key] < nextProd[key]) {
      return 1;
    }
    return 0;
  };
  return sortASC;
};
// проверіть сортіровку по возрастанію
const sortingFunctions = {
  priceASC: getSortingFuncASC('price'),
  priceDESC: getSortingFuncDESC('price'),
  discountASC: getSortingFuncASC('discountPercentage'),
  discountDESC: getSortingFuncDESC('discountPercentage'),
  remove: '',
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
  updateAllOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
  },

  getFilteredData(data) {
    let result = data;
    //console.log(this.options);
    const { category, brand, sort } = this.options;

    if (category.length > 0) {
      result = filterDataByArrValues(result, 'category', category);
    } if (brand.length > 0) {
      result = filterDataByArrValues(result, 'brand', brand);
    } if (sort.length > 0) {
      const fn = sortingFunctions[sort];
      result = result.sort(fn);
    }
    // if (search.length > 0) {

    // }
    // console.log(result);
    return result;
  },
};

export default multiFilter;
