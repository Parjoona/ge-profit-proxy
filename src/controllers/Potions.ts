import axios, { AxiosResponse } from 'axios';
import { Get, JsonController } from 'routing-controllers';
import {
  ICurrentPriceResponse,
  ICurrentPriceModel,
} from 'src/models/Price.models';

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

@JsonController()
export class PotionsController {
  @Get('/potions')
  async getAll() {
    const { data: res }: AxiosResponse<ICurrentPriceResponse> = await axios.get(
      'https://prices.runescape.wiki/api/v1/osrs/latest'
    );

    const mapped = Object.entries(res.data).map(([key, value]) => ({
      id: Number(key),
      price: value,
    }));

    // Get item with id 257 (Ranarr weed), 99 (Ranarr potion (unf)), 139 (Ranarr potion), 231 (Snape grass)
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

    const ranarrResult: IPotionResults[] = mapped.map((item) => {
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

    const createObject = ({ items, base, ingredient, result }: IProfiable) => {
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

    return {
      ranarr: {
        ...createObject({
          items: resultsFiltered,
          base: 99,
          ingredient: 231,
          result: 139,
        }),
      },
    };
  }
}
