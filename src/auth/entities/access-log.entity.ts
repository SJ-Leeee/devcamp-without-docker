import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entity';
import { User } from './user.entity';

@Entity()
export class AccessLog extends BaseEntity {
  @ManyToOne(() => User)
  user: Relation<User>;

  @Column()
  endpoint: string;

  @Column()
  ip: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  accessedAt: Date;
}
