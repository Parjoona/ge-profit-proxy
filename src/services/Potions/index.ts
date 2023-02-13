import { IPotionOptions } from 'src/models/Potions.models';
import { ICurrentPriceResponse } from 'src/models/Price.models';
import { createPotionBase } from '../../utils/Potions/potion-helpers';
import recipes from '../../utils/Potions/potionRecipe';

const PotionService = ({ data }: ICurrentPriceResponse) => {
  const mapped = Object.entries(data).map(([key, value]) => ({
    id: Number(key),
    price: value,
  }));

  const potionBase = createPotionBase(mapped);

  const allRecipies = recipes.map(({ name, ...rest }) => {
    return potionBase(name, rest as IPotionOptions);
  });

  return allRecipies;
};

export default PotionService;
