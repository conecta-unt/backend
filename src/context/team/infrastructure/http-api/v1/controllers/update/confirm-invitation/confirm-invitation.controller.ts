import { Request } from 'express';
import { Body, Controller, Patch, Req, UseGuards } from 'src/bootstrap';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { ConfirmInvitationDTO } from './confirm-invitation.dto';
import { TEAM_API_V1_BASE_PATH } from '../../../constants';
import { ConfirmInvitationUseCase } from 'src/context/team/application';

@Controller(`${TEAM_API_V1_BASE_PATH}/invitations/confirm`)
export class ConfirmInvitationController {
  constructor(private readonly confirm: ConfirmInvitationUseCase) {}

  @Patch()
  @UseGuards(AuthGuard)
  run(@Req() req: Request, @Body() data: ConfirmInvitationDTO) {
    return this.confirm.execute(req, data);
  }
}
