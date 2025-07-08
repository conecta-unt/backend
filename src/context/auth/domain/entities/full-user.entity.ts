export interface IFullUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  role: string;
  firstname?: string;
  lastname?: string;
  profileImage?: string;
  major?: string;
  area?: string;
  bio?: string;
}

export class FullUserEntity implements IFullUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  role: string;
  firstname?: string;
  lastname?: string;
  profileImage?: string;
  major?: string;
  area?: string;
  bio?: string;

  constructor(attrs: IFullUser) {
    this.id = attrs.id;
    this.username = attrs.username;
    this.email = attrs.email;
    this.provider = attrs.provider;
    this.role = attrs.role;
    this.firstname = attrs.firstname;
    this.lastname = attrs.lastname;
    this.profileImage = attrs.profileImage;
    this.major = attrs.major;
    this.area = attrs.area;
    this.bio = attrs.bio;
  }
}
