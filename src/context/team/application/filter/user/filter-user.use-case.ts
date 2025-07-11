import { BadRequestException, Injectable } from 'src/bootstrap';
import { InDatabaseUserProfileRepository } from 'src/context/auth/infrastructure/persistence';

@Injectable()
export class FilterTeamUsersUseCase {
  constructor(private readonly profile: InDatabaseUserProfileRepository) {}

  execute(q: string | undefined) {
    if (!q) throw new BadRequestException();

    return this.profile.filterByUsername(q);
  }
}
