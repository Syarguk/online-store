export const numbersTypeArea: string[] = ['id', 'price', 'discountPercentage', 'rating', 'stock'];

export const filtersName: string[] = ['category', 'brand'];
export const rangeFilterNames: string[] = ['price', 'stock'];

type Routes = {
  main: string,
  basket: string,
  product: string,
  mainSearch: string,
};

export const routes: Routes = {
  main: '/',
  basket: '/basket',
  product: '/product',
  mainSearch: '/main',
};

export const singleValues = ['sort', 'search', 'big', 'id'];
