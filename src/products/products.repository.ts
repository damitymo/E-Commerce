import { Injectable } from "@nestjs/common";


@Injectable()
export class ProductsRepository {
    private products = [
        {
            id: 1,
            name: 'Product 1',
            price: 1000,
            description: 'This is product 1',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 2000,
            description: 'This is product 2',
        },
        {
            id: 3,
            name: 'Product 3',
            price: 3000,
            description: 'This is product 3',
        },
    ];

    getProducts() {
        return this.products;

        }
 }