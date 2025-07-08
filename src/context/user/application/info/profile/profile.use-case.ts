import { Request } from 'express';
import { Injectable } from 'src/bootstrap';
import { UserNotFoundException } from 'src/context/auth/domain';
import {
  InDatabaseProviderRepository,
  InDatabaseRoleRepository,
  InDatabaseUserProfileRepository,
  InDatabaseUserRepository,
} from 'src/context/auth/infrastructure/persistence';
import { UserPayload } from 'src/global/types/user';

@Injectable()
export class GetUserProfileUseCase {
  constructor(
    private readonly user: InDatabaseUserRepository,
    private readonly profile: InDatabaseUserProfileRepository,
    private readonly provider: InDatabaseProviderRepository,
    private readonly role: InDatabaseRoleRepository,
  ) {}

  async execute(req: Request, q: string | undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const user = q
      ? await this.user.findByUsername(q)
      : await this.user.findById(userPayload.id);

    if (!user) throw new UserNotFoundException();

    const profile = await this.profile.findOne(user.id);
    const provider = await this.provider.findOne(user.providerId);
    const role = await this.role.findOne(user.roleId);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      provider: provider?.name,
      role: role?.name,
      firstname: profile?.firstname,
      lastname: profile?.lastname,
      profileImage: profile?.profileImage,
      major: profile?.major,
      area: profile?.area,
      bio: profile?.bio,
    };
  }
}
