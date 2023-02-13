import { IGenericObject } from 'src/models/Common.models';
import { IPotionOptions, IPotionResponse } from '../../models/Potions.models';
import {
  ICurrentPriceMapped,
  ICurrentPriceModel,
} from '../../models/Price.models';

interface IPotionResults {
  id: number;
  name: string;
  price: ICurrentPriceModel;
}

interface IProfitable {
  items: IPotionResults[];
  base: number;
  ingredient: number;
  finished: number;
  multiplier?: number;
}

export const createGenericPotionObject = (options: IPotionOptions) =>
  Object.values(options).reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {}) as IGenericObject;

export const createProfitObjectForPotion = ({
  items,
  base,
  ingredient,
  finished,
  multiplier = 1,
}: IProfitable) => {
  const basePrice = items.find((x) => x.id === base);
  const ingredientPrice = items.find((x) => x.id === ingredient);
  const resultPrice = items.find((x) => x.id === finished);

  const baseLow = basePrice.price.low;
  const ingredientLow = ingredientPrice.price.low * multiplier;

  const totalCost = baseLow + ingredientLow;

  const amount = resultPrice.price.high - totalCost;

  return {
    profitable: amount > 0,
    profit: amount,
    ingredients: items,
  };
};

export const createPotionBase =
  (items: ICurrentPriceMapped[]) =>
  (name: string, options: IPotionOptions): IPotionResponse => {
    const createObj: IGenericObject = createGenericPotionObject(options);

    const results = items.map((item) => {
      const name = createObj[item.id] ?? null;

      if (!name) return null;

      return {
        name,
        id: item.id,
        price: item.price,
      };
    });

    const resultsFiltered = results.filter((item) => item !== null);

    const { base, ingredient, finishedPotion } = options;

    const potionResult = createProfitObjectForPotion({
      items: resultsFiltered,
      base: base.id,
      ingredient: ingredient.id,
      finished: finishedPotion.id,
      multiplier: options.ingredient?.multiplier,
    });

    return { name, ...potionResult };
  };
