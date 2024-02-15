import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CouponRepository,
  IssuedCouponRepository,
  OrderItemRepository,
  OrderRepository,
  PointLogRepository,
  PointRepository,
  ProductRepository,
  ShippingInfoRepository,
} from './repositories';
import {
  Coupon,
  IssuedCoupon,
  Order,
  OrderItem,
  Point,
  PointLog,
  Product,
  ShippingInfo,
} from './entities';
import { AuthModule } from '../auth/auth.module';
import { PaymentService, ProductService } from './services';
import { AuthService } from 'src/auth/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      ShippingInfo,
      Point,
      PointLog,
      Coupon,
      IssuedCoupon,
      Product,
    ]),
  ],
  providers: [
    ConfigService,
    JwtService,
    PaymentService,
    ProductService,
    AuthService,
    OrderRepository,
    OrderItemRepository,
    ShippingInfoRepository,
    ProductRepository,
    CouponRepository,
    IssuedCouponRepository,
    PointRepository,
    PointLogRepository,
  ],
})
export class PaymentModule {}
