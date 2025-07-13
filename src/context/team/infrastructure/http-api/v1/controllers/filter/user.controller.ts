import { Controller, Get, Query, Req, UseGuards } from 'src/bootstrap';
import { TEAM_API_V1_BASE_PATH } from '../../constants';
import { FilterTeamUsersUseCase } from 'src/context/team/application/filter/user/filter-user.use-case';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';

@Controller(`${TEAM_API_V1_BASE_PATH}/filter/user`)
export class FilterTeamUsersController {
  constructor(private readonly filter: FilterTeamUsersUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(@Req() req: Request, @Query('user') query: string) {
    return this.filter.execute(req, query);
  }
}
