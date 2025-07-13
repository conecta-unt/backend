import { Request } from 'express';
import { Injectable } from 'src/bootstrap';
import { ConfirmInvitationDTO } from './confirm-invitation.dto';
import { UserPayload } from 'src/global/types/user';
import { Member } from 'src/context/auth/infrastructure/persistence';

@Injectable()
export class ConfirmInvitationUseCase {
  async execute(req: Request, data: ConfirmInvitationDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    await Member.update(
      { teamId: data.teamId, userId: userPayload.id },
      { confirmed: data.confirmed },
    );
  }
}
