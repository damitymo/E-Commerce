import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
    @ApiProperty({
        description: 'The product id',
        type: String,
        required: true,
        default: '1',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The name of the product',
        type: String,
        required: true,
        default: 'Product',
    })
    @Column({ length: 50, nullable: false })
    name: string;

    @ApiProperty({
        description: 'The description of the product',
        type: String,
        required: true,
        default: 'Description',
    })
    @Column({ nullable: false })
    description: string;

    @ApiProperty({
        description: 'The price of the product',
        type: Number,
        required: true,
        default: 100,
    })
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @ApiProperty({
        description: 'The stock of the product',
        type: Number,
        required: true,
        default: 100,
    })
    @Column({ nullable: false })
    stock: number;

    @ApiProperty({
        description: 'The image url of the product',
        type: String,
        required: true,
        default: 'https://ruta-a-imagen-por-defecto.com/default-image.png',
    })
    @Column({ default: 'https://ruta-a-imagen-por-defecto.com/default-image.png' })
    imgUrl: string;

    @ApiProperty({
        description: 'The category of the product',
        type: Object,
        required: true,
        default: '{id: 1}',
    })
    @ManyToOne(() => Category, category => category.products)
    category: Category;


    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[];
}
