import {
  UserProfileEntity,
  UserProfileRepository,
} from 'src/context/auth/domain';
import { UserProfile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { Injectable } from 'src/bootstrap';

@Injectable()
export class InDatabaseUserProfileRepository implements UserProfileRepository {
  async findOne(userId: number): Promise<UserProfileEntity | null> {
    const userProfile = await UserProfile.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return userProfile
      ? this._createUserProfileEntityInstance(userProfile)
      : null;
  }

  async filterByUsername(username: string): Promise<any[]> {
    const profiles = await UserProfile.createQueryBuilder('profile')
      .innerJoinAndSelect('profile.user', 'user')
      .where('LOWER(user.username) LIKE :username', {
        username: `%${username.toLowerCase()}%`,
      })
      .andWhere('user.role IN (:...roles)', {
        roles: [3, 4],
      })
      .limit(10)
      .getMany();

    return profiles.map((profile) => ({
      id: profile.userId,
      username: profile.user.username,
      firstname: profile.firstname,
      lasname: profile.lastname,
      profileImage: profile.profileImage,
    }));
  }

  async create(data: UserProfileEntity): Promise<UserProfileEntity> {
    const user = UserProfile.create({
      user: { id: data.user_id } as User,
      firstname: data.firstname,
      lastname: data.lastname,
      profileImage: data.profileImage,
    });

    const savedUserProfile = await user.save();
    return this._createUserProfileEntityInstance(savedUserProfile);
  }

  async update(data: UserProfileEntity): Promise<void> {
    await UserProfile.update(data.user_id, {
      firstname: data.firstname,
      lastname: data.lastname,
      profileImage: data.profileImage,
      major: data.major,
      area: data.area,
      bio: data.bio,
    });
  }

  _createUserProfileEntityInstance(data: UserProfile): UserProfileEntity {
    return UserProfileEntity.create({
      user_id: data.user.id,
      firstname: data.firstname,
      lastname: data.lastname,
      profileImage: data.profileImage,
      major: data.major,
      area: data.area,
      bio: data.bio,
    });
  }
}
