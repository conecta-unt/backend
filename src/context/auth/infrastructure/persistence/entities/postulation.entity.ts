import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Offer } from './offer.entity';
import { User } from './user.entity';
import { Team } from './team.entity';

@Entity({ name: 'postulation' })
export class Postulation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Offer, (offer) => offer.postulation, { nullable: true })
  offer: Offer;

  @ManyToOne(() => User, (user) => user.postulation, { nullable: true })
  user: User;

  @ManyToOne(() => Team, (team) => team.postulation, { nullable: true })
  team: Team;

  @Column({ type: 'boolean', nullable: true })
  accepted: boolean;
}
