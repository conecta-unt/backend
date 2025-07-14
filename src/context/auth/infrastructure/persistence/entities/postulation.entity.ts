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

  @ManyToOne(() => Offer, (offer) => offer.id, { nullable: true })
  offer: Offer;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;

  @ManyToOne(() => Team, (team) => team.id, { nullable: true })
  team: Team;

  @Column({ type: 'boolean', nullable: true })
  accepted: boolean;
}
