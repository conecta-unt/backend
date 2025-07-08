import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from 'src/bootstrap';
import { AppConfigService } from 'src/global/services/app-config.service';
import {
  InvalidUserLoginException,
  UserEntity,
  UserInvalidCredentialsException,
  UserProfileEntity,
  UserProfileRepository,
  UserRepository,
} from '../../../domain';
import { GoogleSocialLoginDTO } from './google.dto';
import { AuthSharedService } from '../../shared/auth-shared.service';
import { GoogleUserCredentials, GoogleUserInfo } from './google.types';
import {
  ClientRoleE,
  roles,
  UniversityMemberE,
} from 'src/global/types/enums/role.enum';

@Injectable()
export class GoogleSocialLoginUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly jwt: JwtService,
    private readonly profile: UserProfileRepository,
    private readonly shared: AuthSharedService,
    private readonly user: UserRepository,
  ) {}

  async execute(
    req: FastifyRequest,
    res: FastifyReply,
    data: GoogleSocialLoginDTO,
  ) {
    if (
      !data.code ||
      !data.metadata.redirectUrl ||
      !data.metadata.redirectErrorUrl
    )
      throw new BadRequestException();

    const userInfo = await this._getUserinfo(data.code);
    const user = await this.user.findByEmail(userInfo.email);

    if (!user) {
      if (!data.role) {
        res.redirect(
          `${data.metadata.redirectErrorUrl}?error=account_not_found`,
          302,
        );
        return;
      }
      if (!this._isValidUserRole(userInfo.email, data.role))
        throw new UserInvalidCredentialsException();

      const roleId = roles[data.role];

      const newUser = UserEntity.create({
        username: await this.shared.generateUsername(userInfo.email),
        email: userInfo.email,
        providerId: this.config.googleProviderId,
        roleId: roleId,
      });
      newUser.isEmailVerified = true;

      const newUserCreated = await this.user.create(newUser);

      await this.profile.create(
        UserProfileEntity.create({
          firstname: userInfo.given_name,
          lastname: userInfo.family_name,
          user_id: newUserCreated.id,
        }),
      );

      await this.shared.sendWelcomeEmail(newUserCreated);

      await this.shared.generateSessionTokens(req, res, newUserCreated);
      res.redirect(data.metadata.redirectUrl, 302);
    } else if (user.providerId !== this.config.googleProviderId) {
      res.redirect(
        `${data.metadata.redirectErrorUrl}?error=provider_error`,
        302,
      );
    } else {
      await this.shared.generateSessionTokens(req, res, user);
      res.redirect(data.metadata.redirectUrl, 302);
    }
  }

  async _getUserinfo(code: string): Promise<GoogleUserInfo> {
    try {
      const response = await axios.post<GoogleUserCredentials>(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: this.config.googleClientID,
          client_secret: this.config.googleClientSecret,
          redirect_uri: 'postmessage',
          grant_type: 'authorization_code',
        },
      );

      return this.jwt.decode<GoogleUserInfo>(response.data.id_token);
    } catch {
      throw new InvalidUserLoginException();
    }
  }

  _isValidUserRole(email: string, role: unknown) {
    const domain = email.split('@')[1];
    const isUniversityMember = domain === 'unitru.edu.pe';

    if (isUniversityMember) {
      // Debe ser docente o estudiante
      return Object.values(UniversityMemberE).includes(
        role as UniversityMemberE,
      );
    } else {
      // Debe ser cliente
      return Object.values(ClientRoleE).includes(role as ClientRoleE);
    }
  }
}
