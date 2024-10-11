import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { Category } from "../../categories/entities/category.entity";
import { productsMock } from "./products-mock";

@Injectable()
export class ProductsSeed {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async findCategoryByName(category: string){
        const foundCategory = await this.categoryRepository.findOne({
            where: { name: category },});
            if (!foundCategory) {
                throw new Error(`Category ${category} not found`);
            }
            return foundCategory;
    }

    async seed() {
        const existingProductsNames = (await this.productRepository.find()).map(
            (product) => product.name
        );

        for (const productData of productsMock) {
            if (!existingProductsNames.includes(productData.name)) {
                const product= new Product();
                product.name = productData.name;
                product.price = productData.price;
                product.description = productData.description;
                product.stock = productData.stock;
                product.category = await this.findCategoryByName(productData.category);
                await this.productRepository.save(product);
            }
        }
    }
}