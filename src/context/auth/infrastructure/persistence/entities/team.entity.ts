import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Postulation } from './postulation.entity';

@Entity({ name: 'team' })
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @OneToMany(() => Member, (member) => member.team)
  members: Member[];

  @OneToMany(() => Postulation, (postulation) => postulation.team)
  postulation: Postulation[];
}
