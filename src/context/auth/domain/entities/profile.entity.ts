export interface IUserProfile {
  user_id: number;
  firstname?: string;
  lastname?: string;
  profileImage?: string;
  major?: string;
  area?: string;
  bio?: string;
}

export type CreateUserProfileDTO = IUserProfile;

export class UserProfileEntity implements IUserProfile {
  user_id: number;
  firstname?: string;
  lastname?: string;
  profileImage?: string;
  major?: string;
  area?: string;
  bio?: string;

  constructor(attrs: IUserProfile) {
    this.user_id = attrs.user_id;
    this.firstname = attrs.firstname;
    this.lastname = attrs.lastname;
    this.profileImage = attrs.profileImage;
    this.major = attrs.major;
    this.area = attrs.area;
    this.bio = attrs.bio;
  }

  static create(attrs: CreateUserProfileDTO) {
    return new UserProfileEntity(attrs);
  }
}
