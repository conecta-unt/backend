import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, Get, Query, Req, Res } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { GoogleSocialLoginUseCase } from 'src/context/auth/application';
import { RoleE } from 'src/global/types/enums/role.enum';

@Controller(`${AUTH_API_V1_BASE_PATH}/social/google`)
export class GoogleSocialLoginController {
  constructor(private readonly google: GoogleSocialLoginUseCase) {}

  @Get()
  run(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
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
