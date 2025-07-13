import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { OFFER_API_V1_BASE_PATH } from '../../constants';
import { FindAllOffersUseCase } from '../../application';

@Controller(`${OFFER_API_V1_BASE_PATH}/all`)
export class FindAllOffersController {
  constructor(private readonly find: FindAllOffersUseCase) {}

  @Get()
  run(@Query('limit', new ParseIntPipe({ optional: true })) limit: number) {
    return this.find.execute(limit);
  }
}
