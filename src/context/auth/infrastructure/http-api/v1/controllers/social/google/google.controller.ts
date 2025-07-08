import { Controller, Get, Query, Req, Res } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { GoogleSocialLoginUseCase } from 'src/context/auth/application';
import { RoleE } from 'src/global/types/enums/role.enum';
import { Request, Response } from 'express';

@Controller(`${AUTH_API_V1_BASE_PATH}/social/google`)
export class GoogleSocialLoginController {
  constructor(private readonly google: GoogleSocialLoginUseCase) {}

  @Get()
  run(
    @Req() req: Request,
    @Res() res: Response,
    @Query('code') code: string,
    @Query('redirect-url') redirectUrl: string,
    @Query('redirect-error-url') redirectErrorUrl: string,
    @Query('role') role: RoleE,
  ) {
    return this.google.execute(req, res, {
      code,
      role,
      metadata: { redirectUrl, redirectErrorUrl },
    });
  }
}
