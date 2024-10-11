import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Role } from '../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty({
        description: 'The user id',
        type: String,
        required: true,
        default: '1',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The name of the user',
        type: String,
        required: true,
        default: 'Tymo',
    })
    @Column({ length: 50, nullable: false })
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        type: String,
        required: true,
        default: 'tymo@gmail.com',
    })
    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        type: String,
        required: true,
        default: 'password123',
    })
    @Column({ length: 80, nullable: false })
    password: string;

    @ApiProperty({
        description: 'The phone number of the user',
        type: String,
        required: true,
        default: '123456789',
    })
    @Column()
    phone: string;

    @ApiProperty({
        description: 'The country of the user',
        type: String,
        required: true,
        default: 'Argentina',
    })
    @Column({ length: 50 })
    country: string;

    @ApiProperty({
        description: 'The address of the user',
        type: String,
        required: true,
        default: 'Calle Falsa 123',
    })
    @Column()
    address: string;

    @ApiProperty({
        description: 'The city of the user',
        type: String,
        required: true,
        default: 'Buenos Aires',
    })
    @Column({ length: 50 })
    city: string;


    
    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @ApiProperty({
        description: 'The date the user was created',
        type: Date,
        required: true,
        default: '2021-10-10',
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Tipo cambiado a Date
  createdAt: Date;

  @ApiProperty({
    description: 'The role of the user',
    type: String,
    required: true,
    default: 'User',
  })
  @Column({ type: 'enum', enum: Role, default: Role.User })
  administrador: Role;
    
}
