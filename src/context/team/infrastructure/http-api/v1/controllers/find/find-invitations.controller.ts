import { Controller, Get, Req, UseGuards } from 'src/bootstrap';
import { TEAM_API_V1_BASE_PATH } from '../../constants';
import { FindInvitationsUseCase } from 'src/context/team/application';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';

@Controller(`${TEAM_API_V1_BASE_PATH}/invitations`)
export class FindInvitationsController {
  constructor(private readonly invitations: FindInvitationsUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(@Req() req: Request) {
    return this.invitations.execute(req);
  }
}
