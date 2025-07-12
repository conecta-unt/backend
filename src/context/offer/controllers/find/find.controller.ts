import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OFFER_API_V1_BASE_PATH } from '../../constants';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';
import { FindUserOffersUseCase } from '../../application';

@Controller(`${OFFER_API_V1_BASE_PATH}`)
export class FindUserOffersController {
  constructor(private readonly find: FindUserOffersUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(@Req() req: Request) {
    return this.find.execute(req);
  }
}
