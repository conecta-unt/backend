export interface IUserMember {
  id_user: number;
  id_team: number;
  role: string;
}

export class UserMemberEntity implements IUserMember {
  id_user: number;
  id_team: number;
  role: string;

  constructor(attrs: IUserMember) {
    this.id_user = attrs.id_user;
    this.id_team = attrs.id_team;
    this.role = attrs.role;
  }

  static create(attrs: IUserMember) {
    return new UserMemberEntity(attrs);
  }
}
