import { Column, Entity, OneToMany, OneToOne, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entity';
import { IssuedCoupon, Order, Point } from '../../payment/entities';
import { RefreshToken } from './refresh-token.entity';
import { AccessToken } from './access-token.entity';
import { AccessLog } from './access-log.entity';

export type UserRole = 'admin' | 'user';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  role: UserRole;

  @OneToOne(() => Point, (point) => point.user)
  point: Relation<Point>;

  @OneToMany(() => Order, (order) => order.user)
  orders: Relation<Order[]>;

  @OneToMany(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.user)
  issuedCoupons: IssuedCoupon[];

  @OneToMany(() => AccessToken, (token) => token.user)
  accessToken: Relation<AccessToken[]>;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshToken: Relation<RefreshToken[]>;

  @OneToMany(() => AccessLog, (log) => log.user)
  accessLog: Relation<AccessLog[]>;
}
