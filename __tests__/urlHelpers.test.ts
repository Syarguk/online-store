import { changeParamsForUrl, transformUrlToParams } from '../src/common/urlHelpers';

test('check creating correct object', () => {
  const result = { name: 'stock_hi_hey' };
  expect(changeParamsForUrl('name', ['stock', 'hi', 'hey'])).toStrictEqual(result);
});

test('check transform url to object', () => {
  const result = { id: 1, stock: ['10', '120'], sort: ['1', '11'] };
  const check = 'id=1&stock=10_120&sort=1_11';
  expect(transformUrlToParams(check)).toStrictEqual(result);
});
