interface ObjectInterface {
  [key: string]: string | number;
}

export const transformUrlToParams = (url:string):ObjectInterface => {
  const stringParams = url.split(':')[1].split('&');
  const params = stringParams.reduce((acc: ObjectInterface, param) => {
    const [key, value] = param.split('=');
    acc[key] = value;
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
