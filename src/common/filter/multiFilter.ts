import { Products, Product } from '../../types/products';

const filterDataByArrValues = (data: Products, key: string, options: string[]) => {
  const result = data.flatMap((item) => {
    const tmp: Products = [];
    options.forEach((val) => {
      if (item[key as keyof Product] === val) { tmp.push(item); }
    });
    return tmp;
  });
  return result;
};

const getSortingFuncASC = (key: string) => {
  const sortASC = (prod: Product, nextProd: Product) => {
    if (prod[key as keyof Product] < nextProd[key as keyof Product]) {
      return -1;
    }
    if (prod[key as keyof Product] > nextProd[key as keyof Product]) {
      return 1;
    }
    return 0;
  };
  return sortASC;
};

const getSortingFuncDESC = (key: string) => {
  const sortASC = (prod: Product, nextProd: Product) => {
    if (prod[key as keyof Product] > nextProd[key as keyof Product]) {
      return -1;
    }
    if (prod[key as keyof Product] < nextProd[key as keyof Product]) {
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

const searchValInData = (searchVal: string, data: Products) => {
  const delNoInformativeFild = (product: Product) => {
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

const filterDataByMinMax = (data: Products, key: string, min: number, max: number) => {
  const result = data.filter((item) => item[key as keyof Product] >= min)
    .filter((item) => item[key as keyof Product] <= max);
  return result;
};

type Options = {
  category: string[],
  brand: string[],
  search: string,
  price: string[],
  stock: string[],
  sort: string,
};

const initFilterOptions: Options = {
  category: [],
  brand: [],
  search: '',
  price: [],
  stock: [],
  sort: '',
};

const multiFilter = {
  options: initFilterOptions,

  addToMultiOptions(key: string, value: string) : void {
    this.options[key as keyof Options] = [...this.options[key as keyof Options], value];
  },
  dropFromMultiOptions(key: string, value: string): void {
    const currentOpt = this.options[key as keyof Options];
    if (Array.isArray(currentOpt)) {
      this.options[key as keyof Options] = currentOpt.filter((item) => item !== value);
    }
  },
  getMultiOptions(key: string): string[] {
    const options = this.options[key as keyof Options];
    if (Array.isArray(options)) {
      return options;
    }
    return [];
  },

  changeOption(key: string, value: string | string[]): void {
    this.options[key as keyof Options] = value;
  },

  dropAllOptions(): void {
    this.options = initFilterOptions;
  },
  updateAllOptions(newOptions: Options): void {
    this.options = { ...this.options, ...newOptions };
  },

  getFilteredData(data: Products): Products {
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
      result = filterDataByMinMax(result, 'price', Number(min), Number(max));
    } if (stock.length > 0) {
      const [min, max] = stock;
      result = filterDataByMinMax(result, 'stock', Number(min), Number(max));
    } if (sort.length > 0) {
      const fn = sortingFunctions[sort];

      result = result.sort(fn);
    }

    return result;
  },
};

export default multiFilter;
