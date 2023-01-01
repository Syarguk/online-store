import { numbersTypeArea } from './constans';
import { ObjectInterface } from '../types/products';

export const transformUrlToParams = (url:string):ObjectInterface => {
  const stringParams = url.split(':')[1].split('&');
  const params = stringParams.reduce((acc: ObjectInterface, param) => {
    const [key, value] = param.split('=');
    if (numbersTypeArea.includes(key)) {
      acc[key] = Number(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
  return params;
};

export const transformParamsToUrl = (params: ObjectInterface):string => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `?${query}`;
};
