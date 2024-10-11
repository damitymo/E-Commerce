import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, ProductId } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({
        description: 'The user id',
        type: String,
        required: true,
        default: '1',
    })
    // @IsNotEmpty()
    // @IsUUID()
    // @IsString()
    userId: string;
    
    @ApiProperty({
        description: 'The products id',
        type: [String],
        required: true,
        default: ['1'],
    })
    // @IsArray()
    products: Array<ProductId>;
}
