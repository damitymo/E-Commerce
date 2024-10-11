import { ApiProperty } from "@nestjs/swagger";

import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        type: String,
        required: true,
        default: 'Damian Tymoszuk', 
    })
    @MaxLength(80)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        type: String,
        required: true,
        default: 'email@gmail.com',
    })
    @IsEmail()
    email: string;
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/, { message: 'Password too weak' })

    @ApiProperty({
        description: 'The password of the user',
        type: String,
        required: true,
        default: 'password123',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'The confirm password of the user',
        type: String,
        required: true,
        default: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;

    @ApiProperty({
        description: 'The address of the user',
        type: String,
        required: true,
        default: 'Calle Falsa 123',
    })
    @MaxLength(80)
    @MinLength(3)
    @IsString()
    address: string;

    @ApiProperty({
        description: 'The phone number of the user',
        type: String,
        required: true,
        default: '123456789',
    })
    @IsPhoneNumber(null, { message: 'Phone number is invalid' })
    phone: string;

    @ApiProperty({
        description: 'The country of the user',
        type: String,
        required: true,
        default: 'Argentina',
    })

    @MaxLength(20)
    @MinLength(5)
    @IsString()
    @IsOptional()
    country?: string;


    @ApiProperty({
        description: 'The city of the user',
        type: String,
        required: true,
        default: 'Buenos Aires',
    })
    @MaxLength(20)
    @MinLength(5)
    @IsString()
    @IsOptional()
    city?: string;

    
   
}
