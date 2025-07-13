import { IsBoolean, IsInt } from 'class-validator';

export class ConfirmInvitationDTO {
  @IsBoolean()
  confirmed: boolean;

  @IsInt()
  teamId: number;
}
