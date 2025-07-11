export interface ITeam {
  id: number;
  name: string;
}

export type CreateNewTeamEntity = Omit<ITeam, 'id'>;

export class TeamEntity implements ITeam {
  id: number;
  name: string;

  constructor(attrs: ITeam) {
    this.id = attrs.id;
    this.name = attrs.name;
  }

  static create(attrs: CreateNewTeamEntity) {
    return new TeamEntity({
      ...attrs,
      id: 0,
    });
  }
}
