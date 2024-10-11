import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared/shared.module';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
