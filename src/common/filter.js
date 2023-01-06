const filterDataByArrValues = (data, key, values) => {
  const result = data.flatMap((item) => {
    const tmp = [];
    values.forEach((val) => {
      if (item[key] === val) { tmp.push(item); }
    });
    return tmp;
  });
  return result;
};

const filterStrategue = {
  values: {
    category: [],
    brand: [],
    search: '',
    price: '',
    stock: '',
    sort: '',
  },

  addValToArr(key, value) {
    this.values[key] = [...this.values[key], value];
  },
  dropValFromArr(key, value) {
    this.values[key] = this.values[key].filter((item) => item !== value);
  },
  getFilterValues(key) {
    return this.values[key];
  },
  addValue(key, value) {
    this.values[key] = value;
  },
  dropValue(key) {
    this.values[key] = '';
  },
  filterData(data) {
    let result = data;
    const { category, brand } = this.values;

    if (category.length > 0) {
      result = filterDataByArrValues(result, 'category', category);
    } if (brand.length > 0) {
      result = filterDataByArrValues(result, 'brand', brand);
    }
    // if (search.length > 0) {

    // }
    // console.log(result);
    return result;
  },
};

export default filterStrategue;
