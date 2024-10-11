import { ApiProperty } from "@nestjs/swagger";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";

@Entity()
export class Order {
    @ApiProperty({
        description: 'The order id',
        type: String,
        required: true,
        default: '1',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ApiProperty({
        description: 'The order date',
        type: Date,
        required: true,
        default: '2021-10-10',
    })
    @Column()
    date: Date;

    
    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetail: OrderDetail;
}
