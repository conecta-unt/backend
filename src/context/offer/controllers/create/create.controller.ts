import { Body, Controller, Post, Req, UseGuards } from 'src/bootstrap';
import { OFFER_API_V1_BASE_PATH } from '../../constants';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';
import { CreateOfferDTO } from './create.dto';
import { CreateOfferUseCase } from '../../application';

@Controller(`${OFFER_API_V1_BASE_PATH}/create`)
export class CreateOfferController {
  constructor(private readonly create: CreateOfferUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  run(@Req() req: Request, @Body() data: CreateOfferDTO) {
    return this.create.execute(req, data);
  }
}
