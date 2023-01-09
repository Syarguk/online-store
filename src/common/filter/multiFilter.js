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

const sortingFunctions = {
  priceASC: getSortingFuncASC('price'),
  priceDESC: getSortingFuncDESC('price'),
  discountASC: getSortingFuncASC('discountPercentage'),
  discountDESC: getSortingFuncDESC('discountPercentage'),
};

const searchValInData = (searchVal, data) => {
  const delNoInformativeFild = (product) => {
    delete product.id;
    delete product.thumbnail;
    delete product.images;
    return product;
  };

  const result = data.flatMap((item) => {
    const targetItem = delNoInformativeFild({ ...item });
    const values = Object.values(targetItem);
    const tmp = [];
    for (let i = 0; i < values.length; i += 1) {
      const strVal = String(values[i]).toLowerCase();
      if (strVal.includes(searchVal)) {
        tmp.push(item);
        break;
      }
    }
    return tmp;
  });
  return result;
};

const initFilterOptions = {
  category: [],
  brand: [],
  search: '',
  price: [],
  stock: [],
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
    let result = [...data];
    const {
      category, brand, sort,
      search, price, stock,
    } = this.options;

    if (category.length > 0) {
      result = filterDataByArrValues(result, 'category', category);
    } if (brand.length > 0) {
      result = filterDataByArrValues(result, 'brand', brand);
    } if (search.length > 0) {
      const searchedData = searchValInData(search, result);
      result = searchedData;
    } if (price.length > 0) {
      const [min, max] = price;
      result = result.filter((item) => item.price >= min)
        .filter((item) => item.price <= max);
    } if (stock.length > 0) {
      const [min, max] = stock;
      result = result.filter((item) => item.stock >= min)
        .filter((item) => item.stock <= max);
    } if (sort.length > 0) {
      const fn = sortingFunctions[sort];

      result = result.sort(fn);
    }

    return result;
  },
};

export default multiFilter;
