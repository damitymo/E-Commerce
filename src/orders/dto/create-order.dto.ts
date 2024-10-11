import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';   
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
export interface ProductId {
    id: string;
    }

export class CreateOrderDto {
    @ApiProperty({
        description: 'The user id',
        type: String,
        required: true,
        default: '1',
    })
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'The products id',
        type: [String],
        required: true,
        default: ['1'],
    })

    @IsArray()
    products: Array<ProductId>;
}
