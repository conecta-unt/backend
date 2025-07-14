import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { POSTULATION_API_V1_BASE_PATH } from '../../constants';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';
import { FindPostulationUseCase } from 'src/context/postulation/application';

@Controller(`${POSTULATION_API_V1_BASE_PATH}`)
export class FindPostulationController {
  constructor(private readonly find: FindPostulationUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(@Req() req: Request) {
    return this.find.execute(req);
  }
}
