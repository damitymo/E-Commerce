import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { OrderDetailsModule } from '../order-details/order-details.module';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, Product, User]),
    ProductsModule,
    UsersModule,
    OrderDetailsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
