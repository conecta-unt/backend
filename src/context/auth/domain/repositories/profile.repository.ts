import { UserProfileEntity } from '../entities/profile.entity';

export abstract class UserProfileRepository {
  abstract findOne(userId: number): Promise<UserProfileEntity | null>;
  abstract filterByUsername(username: string): Promise<any[]>;
  abstract create(data: UserProfileEntity): Promise<UserProfileEntity>;
  abstract update(data: UserProfileEntity): Promise<void>;
}
