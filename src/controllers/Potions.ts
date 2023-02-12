import axios, { AxiosResponse } from 'axios';
import { Get, JsonController } from 'routing-controllers';
import { ICurrentPriceResponse } from 'src/models/Price.models';
import PotionService from '../services/Potions/index';

@JsonController()
export class PotionsController {
  @Get('/potions')
  async getAll() {
    const { data: res }: AxiosResponse<ICurrentPriceResponse> = await axios.get(
      'https://prices.runescape.wiki/api/v1/osrs/latest'
    );

    const serviceResult = PotionService({ data: res.data });

    return { data: serviceResult };
  }
}
