import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class OrderDetail {
    @ApiProperty({
        description: 'The order detail id',
        type: String,
        required: true,
        default: '1',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The price of the order',
        type: Number,
        required: true,
        default: 100,
    })
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @ApiProperty({
        description: 'The products of the order',
        type: Array,
        required: true,
        default: [{id: 1}],
    })
    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinColumn()
    products: Product[];

    @ApiProperty({
        description: 'The order of the order detail',
        type: Object,
        required: true,
        default: {id: 1},
    })
    @OneToOne(() => Order, order => order.orderDetail)
    order: Order;
}
