import { ICurrentPriceResponse } from 'src/models/Price.models';
import PotionsRanarr from './Potions.ranarr';

const PotionService = ({ data }: ICurrentPriceResponse) => {
  const mapped = Object.entries(data).map(([key, value]) => ({
    id: Number(key),
    price: value,
  }));

  const ranarr = PotionsRanarr(mapped);

  return { ranarr };
};

export default PotionService;
