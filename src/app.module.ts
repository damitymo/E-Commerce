import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { postgresDataSourceConfig } from './config/data-source';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { CategoriesModule } from './categories/categories.module';
import { CloudinaryService } from './service/cloudinary/cloudinary.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SharedModule } from './shared/shared/shared.module';
import { sqliteDataSourceConfig } from 'test/typeorm-testing-config';

@Module({
  imports: [ 
    ConfigModule.forRoot({ 
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
      load: [postgresDataSourceConfig, sqliteDataSourceConfig, () => ({
        enviroment: process.env.ENVIROMENT || 'TEST',
    })],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('postgres'), 
    }),
    ProductsModule, 
    AuthModule, 
    UsersModule, 
    OrdersModule,   
    OrderDetailsModule, 
    CategoriesModule, 
    FileUploadModule, 
    SharedModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
}) 
export class AppModule {}
