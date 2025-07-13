import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TEAM_API_V1_BASE_PATH } from '../../constants';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';
import { FindTeamsUseCase } from 'src/context/team/application';

@Controller(`${TEAM_API_V1_BASE_PATH}`)
export class FindTeamsController {
  constructor(private readonly findTeams: FindTeamsUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(@Req() req: Request) {
    return this.findTeams.execute(req);
  }
}
