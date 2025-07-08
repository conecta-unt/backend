import { Request, Response } from 'express';
import { Injectable } from 'src/bootstrap';
import { UserRefreshTokenRepository } from 'src/context/auth/domain';

@Injectable()
export class UserLogoutUseCase {
  constructor(private readonly refreshToken: UserRefreshTokenRepository) {}

  async execute(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token as string;

    if (!refresh_token) return;

    await this.refreshToken.revokeToken(refresh_token);

    res.clearCookie('access_token', {
      domain: req.hostname,
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });

    res.clearCookie('refresh_token', {
      domain: req.hostname,
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });

    res.status(200).send();
  }
}
