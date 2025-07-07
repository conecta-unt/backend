import { Injectable } from 'src/bootstrap';
import { FindUsernameDTO } from './find-username.dto';
import { InDatabaseUserRepository } from 'src/context/auth/infrastructure/persistence';

@Injectable()
export class FindUsernameUseCase {
  constructor(private readonly user: InDatabaseUserRepository) {}

  async execute(data: FindUsernameDTO) {
    const user = await this.user.findByUsername(data.query);

    if (user) return true;
    return false;
  }
}
