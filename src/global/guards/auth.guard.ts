import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from 'src/bootstrap';
import { UserPayload } from '../types/user';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const access_token = request.cookies.access_token as string;

    if (!access_token) throw new UnauthorizedException('Token not provided');

    try {
      const payload = this.jwt.verify<UserPayload>(access_token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (request as any).userPayload = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
