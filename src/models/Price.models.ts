export interface ICurrentPriceResponse {
  data: {
    [id: string]: ICurrentPriceModel;
  };
}

export interface ICurrentPriceModel {
  high: number;
  highTime: number;
  low: number;
  lowTime: number;
}
