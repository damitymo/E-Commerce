import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {
    @ApiProperty({
        description: 'The order id',
        type: String,
        required: true,
        default: '1',
    })
    order: Object;

    @ApiProperty({
        description: 'The price of the order',
        type: Number,
        required: true,
        default: 100,
    })
    price: number;

    @ApiProperty({
        description: 'The products of the order',
        type: Array,
        required: true,
        default: [{id: 1}],
    })
    products: Array<Object>;
}
