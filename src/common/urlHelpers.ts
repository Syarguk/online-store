import { numbersTypeArea, singleValues } from './constans';
import { ObjectInterface } from '../types/products';

type Transform = string | number | string[] | number[];

export const changeParamsForUrl = (name: string, value: string[]) => ({ [name]: value.join('_') });

const transformParamsToNum = (key: string, value: string | string[]): Transform => {
  if (numbersTypeArea.find((i) => i === key)) {
    if (Array.isArray(value)) {
      return value.map((item) => Number(item));
    }
    return Number(value);
  }
  return value;
};

export const transformUrlToParams = (url:string):ObjectInterface => {
  const arrParams = url.split('&');
  const params = arrParams.reduce((acc: ObjectInterface, param) => {
    const [key, value] = param.split('=');
    let newValue;
    const arr = value.split('_');
    if (arr.length > 1 || !singleValues.find((i) => i === key)) {
      newValue = arr;
    } else {
      [newValue] = arr;
    }
    acc[key] = transformParamsToNum(key, newValue);
    return acc;
  }, {});
  return params;
};
