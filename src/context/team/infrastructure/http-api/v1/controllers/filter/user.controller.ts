import { Controller, Get, Query, UseGuards } from 'src/bootstrap';
import { TEAM_API_V1_BASE_PATH } from '../../constants';
import { FilterTeamUsersUseCase } from 'src/context/team/application/filter/user/filter-user.use-case';
import { AuthGuard } from 'src/global/guards/auth.guard';

@Controller(`${TEAM_API_V1_BASE_PATH}/filter/user`)
export class FilterTeamUsersController {
  constructor(private readonly filter: FilterTeamUsersUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(@Query('user') query: string) {
    return this.filter.execute(query);
  }
}
