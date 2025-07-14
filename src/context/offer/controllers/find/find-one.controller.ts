import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OFFER_API_V1_BASE_PATH } from '../../constants';
import { FindOneOfferUseCase } from '../../application';
import { Request } from 'express';
import { AuthGuard } from 'src/global/guards/auth.guard';

@Controller(`${OFFER_API_V1_BASE_PATH}`)
export class FindOneOfferController {
  constructor(private readonly find: FindOneOfferUseCase) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  run(@Req() req: Request, @Param('id') id: number) {
    return this.find.execute(req, id);
  }
}
