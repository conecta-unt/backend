import { Request } from 'express';
import { BadRequestException, Injectable } from 'src/bootstrap';
import { InDatabaseUserProfileRepository } from 'src/context/auth/infrastructure/persistence';
import { UserPayload } from 'src/global/types/user';

@Injectable()
export class FilterTeamUsersUseCase {
  constructor(private readonly profile: InDatabaseUserProfileRepository) {}

  execute(req: Request, q: string | undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    if (!q) throw new BadRequestException();

    return this.profile.filterByUsername(userPayload.id, q);
  }
}
