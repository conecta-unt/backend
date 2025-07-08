import { Controller, Get, Req, Res } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { RefreshTokenUseCase } from 'src/context/auth/application';
import { Request, Response } from 'express';

@Controller(`${AUTH_API_V1_BASE_PATH}/session/refresh-token`)
export class RefreshTokenController {
  constructor(private readonly refreshToken: RefreshTokenUseCase) {}

  @Get()
  run(@Req() req: Request, @Res() res: Response) {
    return this.refreshToken.execute(req, res);
  }
}
