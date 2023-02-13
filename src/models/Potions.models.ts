export interface IPotionResult {
  id: number;
  name: string;
  multiplier?: number;
}

export interface IPotionOptions {
  name: string;
  base: IPotionResult;
  ingredient: IPotionResult;
  finishedPotion: IPotionResult;
}

export interface IPotionResponse {
  profitable: boolean;
  profit: number;
  ingredients: IPotionResult[];
  name: string;
}
