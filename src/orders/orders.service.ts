import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, ProductId } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { CreateOrderDetailDto } from 'src/order-details/dto/create-order-detail.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productService: ProductsService,
    private readonly userService: UsersService,
    private readonly orderDetailsService: OrderDetailsService,
  ) { }
  

  async create(createOrderDto: CreateOrderDto) {
    
    const { userId, products } = createOrderDto;
    const user = await this.userService.findOneBy(userId);

    const order={
      user: user,
      date: new Date(),
    };

    const orderEntity = await this.orderRepository.save(
      this.orderRepository.create(order),
    );

    const total = await this.calculateTotal(products);

    const orderDetail = new CreateOrderDetailDto();
    orderDetail.order = orderEntity;
    orderDetail.price=total;
    orderDetail.products=products;

    const orderDetailEntity = 
    await this.orderDetailsService.create(orderDetail);

    return new OrderResponseDto(orderDetailEntity);

  }

  private async calculateTotal(products: Array<ProductId>): Promise<number> {
    let total = 0;
    for (const product of products) {
      const productEntity = await this.productService.findOne(product.id);
      total += await this.productService.buyProduct(product.id);
    }
    return total;
  }


  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    const order=await this.orderRepository.findOneBy({id});
    const orderDetail=await this.orderDetailsService.findOneByOrderId(
      order.id,
      ['products', 'order'],);
      return orderDetail;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
