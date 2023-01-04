import { numbersTypeArea } from './constans';
import { ObjectInterface } from '../types/products';

type Transform = string | number | string[] | number[];

const transformParamsToNum = (key: string, value: string | string[]): Transform => {
  if (numbersTypeArea.includes(key)) {
    if (Array.isArray(value)) {
      return value.map((item) => Number(item));
    }
    return Number(value);
  }
  return value;
};

export const transformUrlToParams = (url:string):ObjectInterface => {
  const stringParams = url.split(':')[1].split('&');
  const params = stringParams.reduce((acc: ObjectInterface, param) => {
    const [key, value] = param.split('=');
    let newValue;
    const arr = value.split('%');
    if (arr.length > 1) {
      newValue = arr;
    } else {
      // eslint-disable-next-line prefer-destructuring
      newValue = arr[0];
    }
    acc[key] = transformParamsToNum(key, newValue);
    return acc;
  }, {});

  return params;
};

export const transformParamsToUrl = (params: ObjectInterface):string => {
  const query = Object.entries(params)
    .flatMap(([key, value]) => {
      //Свойство "length" не существует в типе "string | number | string[] | number[]"
      if (!value || value.length < 1) {
        return [];
      }
      let resultValue = value;
      if (Array.isArray(value)) {
        resultValue = value.join('%');
      }
      return `${key}=${resultValue}`;
    });
  const resultQuery = query.length === 1 ? query.join('') : query.join('&');

  return resultQuery;
};
