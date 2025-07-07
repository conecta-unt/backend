import { UserRoleEntity } from '../entities/role.entity';

export abstract class UserRoleRepository {
  abstract findOne(id: number): Promise<UserRoleEntity | null>;
}
