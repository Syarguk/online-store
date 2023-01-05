export const numbersTypeArea: string[] = ['id', 'price', 'discountPercentage', 'rating', 'stock'];

export const filtersName: string[] = ['category', 'brand'];

type Routes = {
  main: string,
  basket: string,
  product: string,
  mainSearch: string,
};

export const routes: Routes = {
  main: '/',
  basket: '/basket',
  product: '/product:',
  mainSearch: '/main:',
};
