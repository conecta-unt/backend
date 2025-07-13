import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Team } from './team.entity';

@Entity({ name: 'team_member' })
export class Member extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  teamId: number;

  @ManyToOne(() => User, (user) => user.members)
  user: User;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;

  @Column({ type: 'varchar', length: 30 })
  role: string;

  @Column({ type: 'boolean', nullable: true })
  confirmed: boolean;
}
