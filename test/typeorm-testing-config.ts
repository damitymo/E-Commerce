import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import e from "express";

export const typeOrmTestConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    dropSchema: true,
};

export const sqliteDataSourceConfig = registerAs(
    'sqlite', 
    () => TypeOrmTestModule,
);

export const TypeOrmTestModule = TypeOrmModule.forRoot(typeOrmTestConfig);