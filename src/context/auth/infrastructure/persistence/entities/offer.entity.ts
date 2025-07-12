import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'offer' })
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean' })
  supervisorRequired: boolean;

  @Column({ type: 'boolean' })
  teamRequired: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
