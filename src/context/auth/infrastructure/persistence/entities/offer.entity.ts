import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Postulation } from './postulation.entity';

@Entity({ name: 'offer' })
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;

  @OneToMany(() => Postulation, (postulation) => postulation.offer)
  postulation: Postulation[];

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean' })
  supervisorRequired: boolean;

  @Column({ type: 'boolean' })
  teamRequired: boolean;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
