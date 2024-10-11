import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignupAuthDto {

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
        default: 'tymo@gmail.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        type: String,
        required: true,
        default: 'password123',
    })

    @MaxLength(100)
    @MinLength(8)
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
    @IsPhoneNumber('AR', { message: 'El número de teléfono no es válido para Argentina' })
    phone: string;

    @ApiProperty({
        description: 'The country of the user',
        type: String,
        required: true,
        default: 'Argentina',
    })
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
    @MinLength(5)
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({
        description: 'The createdAt of the user',
        type: String,
        required : true,
        default: '2021-09-01T00:00:00.000Z',
    })
    @IsString()
    @IsOptional()
    createdAt: string;

    constructor(partial: Partial<SignupAuthDto>) {
        Object.assign(this, partial);
    }

}