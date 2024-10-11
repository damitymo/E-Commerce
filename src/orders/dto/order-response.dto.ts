import { ApiProperty } from "@nestjs/swagger";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";

export class OrderResponseDto {
    @ApiProperty({
        description: 'Order detail id',
        example: '1'
    })
    id: string

    @ApiProperty({
        description: 'Order detail price',
        example: '100'
    })
    price: number;

    @ApiProperty({
        description: 'Order detail products',
        example: '[{id: 1}]'
    })
    products: object[];

    @ApiProperty({
        description: 'Order detail order',
        example: '{id: 1, date: "2021-10-10", user: {id: 1}}'
    })
    order: {
        id: string;
        date: Date;
        user: {
            id: string;
            };
    };

    constructor(orderDetail: OrderDetail) {
        this.id = orderDetail.id;
        this.price = orderDetail.price;
        this.products = orderDetail.products;
        this.order = {
            id: orderDetail.order.id,
            date: orderDetail.order.date,
            user: {
                id: orderDetail.order.user.id,
            },
        };
    }
}