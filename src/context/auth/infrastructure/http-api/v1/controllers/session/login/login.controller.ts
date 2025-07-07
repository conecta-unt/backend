import { FastifyReply, FastifyRequest } from 'fastify';
import { Body, Controller, Post, Query, Req, Res } from 'src/bootstrap';
import { UserLoginUseCase } from 'src/context/auth/application/session/login/login.use-case';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { UserLoginDTO } from './login.dto';

@Controller(`${AUTH_API_V1_BASE_PATH}/session/login`)
export class UserLoginController {
  constructor(private readonly login: UserLoginUseCase) {}

  @Post()
  run(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Query('redirect-url') redirectURL: string,
    @Body() data: UserLoginDTO,
  ) {
    return this.login.execute(req, res, {
      ...data,
      metadata: { redirectURL },
    });
  }
}
