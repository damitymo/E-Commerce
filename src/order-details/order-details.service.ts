import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class OrderDetailsService {

  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) { }

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
    return await this.orderDetailRepository.save(orderDetail);
  }

  findAll() {
    return `This action returns all orderDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }

  async findOneByOrderId(
    orderId: string, 
    relations: string[]= [],): Promise<OrderDetail | undefined> {
    return await this.orderDetailRepository.findOne({
      where: { order: { id: orderId } },
      relations,
    });
  }
}
