import { Body, Controller, Post, Req } from 'src/bootstrap';
import { ChangePasswordDTO } from './change.dto';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { ChangePasswordUseCase } from 'src/context/auth/application';
import { Request } from 'express';

@Controller(`${AUTH_API_V1_BASE_PATH}/password/change`)
export class ChangePasswordController {
  constructor(private readonly changePassword: ChangePasswordUseCase) {}

  @Post()
  async run(@Req() req: Request, @Body() data: ChangePasswordDTO) {
    return this.changePassword.execute(req, data);
  }
}
