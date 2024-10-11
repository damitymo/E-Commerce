import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInAuthDto {

    @ApiProperty({
        description: 'The email of the user',
        type: String,
        required: true,
        default: 'tymo@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    required: true,
    default: 'password123',
  })
    @IsNotEmpty()
  password: string;

  constructor(partial: Partial<SignInAuthDto>) {
    Object.assign(this, partial);
  } 
} 