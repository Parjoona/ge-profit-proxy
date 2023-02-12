import { ICurrentPriceModel } from 'src/models/Price.models';

interface IPotionResults {
  id: number;
  name: string;
  price: ICurrentPriceModel;
}

interface IProfiable {
  base: number;
  ingredient: number;
  result: number;
  items: IPotionResults[];
}

export const createProfitObjectForPotion = ({
  items,
  base,
  ingredient,
  result,
}: IProfiable) => {
  const basePrice = items.find((x) => x.id === base);
  const ingredientPrice = items.find((x) => x.id === ingredient);
  const resultPrice = items.find((x) => x.id === result);

  const baseLow = basePrice.price.low;
  const ingredientLow = ingredientPrice.price.low;

  const totalCost = baseLow + ingredientLow;

  const amount = resultPrice.price.high - totalCost;

  return {
    profiable: amount > 0,
    profit: amount,
    ingredients: items,
  };
};
