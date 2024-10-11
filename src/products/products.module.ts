import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSeed } from 'src/seeds/products/products.seed';
import { CategoriesSeed } from 'src/seeds/categories/categories.seed';
import { Category } from 'src/categories/entities/category.entity';
import { SeedsModule } from 'src/seeds/seeds.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), SeedsModule, FileUploadModule,AuthModule, JwtModule.register({
    
  })],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductsSeed, CategoriesSeed, FileUploadService, CloudinaryService],
  exports: [ProductsService, ProductsSeed],
})
export class ProductsModule {}
