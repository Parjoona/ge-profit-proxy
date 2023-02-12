import { ICurrentPriceMapped } from 'src/models/Price.models';
import { createProfitObjectForPotion } from '../../utils/Potions/createProfitObjectForPotion';

// Get item with id 257 (Ranarr weed),
// 99 (Ranarr potion (unf)),
// 139 (Ranarr potion),
// 231 (Snape grass)
const handleRanarrValues = (id: number) => {
  switch (id) {
    case 99:
      return 'Ranarr potion (unf)';
    case 139:
      return 'Ranarr potion';
    case 231:
      return 'Snape grass';
    default:
      return null;
  }
};

const PotionsRanarr = (items: ICurrentPriceMapped[]) => {
  const ranarrResult = items.map((item) => {
    const name = handleRanarrValues(item.id);

    if (!name) return null;

    return {
      id: item.id,
      name,
      price: item.price,
    };
  });

  // remove null values
  const resultsFiltered = ranarrResult.filter((item) => item !== null);

  return createProfitObjectForPotion({
    items: resultsFiltered,
    base: 99,
    ingredient: 231,
    result: 139,
  });
};

export default PotionsRanarr;
