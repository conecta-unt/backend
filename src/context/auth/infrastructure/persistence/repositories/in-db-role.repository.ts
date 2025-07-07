import { Injectable } from 'src/bootstrap';
import { UserRoleEntity, UserRoleRepository } from 'src/context/auth/domain';
import { Role } from '../entities';

@Injectable()
export class InDatabaseRoleRepository implements UserRoleRepository {
  async findOne(id: number): Promise<UserRoleEntity | null> {
    const role = await Role.findOne({ where: { id } });
    return role ? this._createRoleEntityInstance(role) : null;
  }

  _createRoleEntityInstance(data: Role): UserRoleEntity {
    return new UserRoleEntity({
      id: data.id,
      name: data.name,
    });
  }
}
