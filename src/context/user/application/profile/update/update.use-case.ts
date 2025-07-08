import { FastifyRequest } from 'fastify';
import { Injectable } from 'src/bootstrap';
import { UpdateUserProfileDTO } from './update.dto';
import {
  InDatabaseUserProfileRepository,
  InDatabaseUserRepository,
} from 'src/context/auth/infrastructure/persistence';
import { UserPayload } from 'src/global/types/user';
import { UserNotFoundException } from 'src/context/auth/domain';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    private readonly profile: InDatabaseUserProfileRepository,
    private readonly user: InDatabaseUserRepository,
  ) {}

  async execute(req: FastifyRequest, data: UpdateUserProfileDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const user = await this.user.findById(userPayload.id);

    if (!user) throw new UserNotFoundException();

    const profile = await this.profile.findOne(user.id);

    if (!profile) throw new UserNotFoundException();

    profile.major = data.major ? data.major : profile.major;
    profile.area = data.area ? data.area : profile.area;
    profile.bio = data.bio ? data.bio : profile.bio;

    await this.profile.update(profile);
  }
}
