import { Body, Controller, Post, Req, UseGuards } from 'src/bootstrap';
import { TEAM_API_V1_BASE_PATH } from '../../constants';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';
import { CreateTeamDTO } from './create.dto';
import { CreateTeamUseCase } from 'src/context/team/application/create/create.use-case';

@Controller(`${TEAM_API_V1_BASE_PATH}/create`)
export class CreateTeamController {
  constructor(private readonly create: CreateTeamUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  run(@Req() req: Request, @Body() data: CreateTeamDTO) {
    return this.create.execute(req, data);
  }
}
