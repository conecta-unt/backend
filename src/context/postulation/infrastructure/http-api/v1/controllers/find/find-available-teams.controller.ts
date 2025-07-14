import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { POSTULATION_API_V1_BASE_PATH } from '../../constants';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';
import { FindAvailableTeamsUseCase } from 'src/context/postulation/application';

@Controller(`${POSTULATION_API_V1_BASE_PATH}/teams`)
export class FindAvailableTeamsController {
  constructor(private readonly find: FindAvailableTeamsUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(
    @Req() req: Request,
    @Query('offerId', new ParseIntPipe()) offerId: number,
  ) {
    return this.find.execute(req, offerId);
  }
}
