import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
    @ApiProperty({
        description: 'The category id',
        type: String,
        required: true,
        default: '1',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The name of the category',
        type: String,
        required: true,
        default: 'Category',
    })
    @Column({ length: 50, nullable: false })
    name: string;

    @ApiProperty({
        description: 'The description of the category',
        type: String,
        required: true,
        default: 'Description',
    })
    @OneToMany(() => Product, product => product.category)
    products: Product[];
}
