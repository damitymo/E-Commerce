import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger/logger.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { auth } from 'express-openid-connect';
//import { auth0Config } from './config/auth0_config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(loggerGlobal);
  // app.use(
  //   auth({...auth0Config})
  // );
  const swaggerConfig = new DocumentBuilder().setTitle('ecommerce-damitymo')
  .setDescription('API para la gestion de un ecommerce')
  .setVersion('1.0')
  .addTag('Ecommerce')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log('La insercion de categorias se ha realizado correctamente');
  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seed();
  console.log('La insercion de productos se ha realizado correctamente');
  await app.listen(3000);
}
bootstrap();
