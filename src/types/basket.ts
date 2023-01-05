interface UPC {
  pro1?: number;
  pro2?: number;
  pro3?: number;
}

interface ProCod {
  Pro1: string;
  Pro2: string;
  Pro3: string;
}

interface ObectProductsId {
  [index: string]: number;
}

type CostAndCount = {cost: number, count: number};

export { UPC, ProCod, ObectProductsId, CostAndCount };
