import { numbersTypeArea, routes } from './constans';
import { ObjectInterface } from '../types/products';

type Transform = string | number | string[] | number[];

const transformStrToNum = (key: string, value: string | string[]): Transform => {
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
      newValue = arr[0];
    }
    // if (numbersTypeArea.includes(key)) {
    //   acc[key] = Number(value);
    // } else {
    acc[key] = transformStrToNum(key, newValue);
    // if (numbersTypeArea.includes(key)) {
    //   acc[key] = Number(value);
    // } else {
    //   acc[key] = value;
    // }
    return acc;
  }, {});
  return params;
};

export const transformParamsToUrl = (params: ObjectInterface):string => {
  const query = Object.entries(params)
    .map(([key, value]) => {
      //console.log(value.length);

      if (!value || value.length < 1) {
        return '';
      }
      let resultValue = value;
      if (Array.isArray(value)) {
        resultValue = value.join('%');
      }
      return `${key}=${resultValue}`;
    })
    .join('&');

  return `${query}`;
};

export const updateUrl = (startUrl: string, params: ObjectInterface): void => {
 // надо как-то убирать префикс маин для поисковых урлов

  const currentUrl = new URL(window.location.href).pathname;
  console.log(currentUrl);

  let path;
  if (currentUrl === routes.main) {
    path = `${startUrl}${transformParamsToUrl(params)}`;
  } else {
    const currentParams = transformUrlToParams(currentUrl);
    const newParams = { ...currentParams, ...params };
    //console.log(newParams);

    path = `${startUrl}${transformParamsToUrl(newParams)}`;
  }
  window.history.pushState({ path }, path, path);
};
