import { ApiProperty } from "@nestjs/swagger";


export class UserResponseDto {

  @ApiProperty({
    description: 'User id',
    example: '1'
  })
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Damian Tymoszuk'
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'tymo@gmail.com'
  })
  email: string;

  @ApiProperty({
    description: 'User address',
    example: 'Calle Falsa 123'
  })
  address: string;

  @ApiProperty({
    description: 'User phone',
    example: '123456789'
  })
  phone: string;

  @ApiProperty({
    description: 'User country',
    example: 'Argentina'
  })
  country?: string;

  @ApiProperty({
    description: 'User city',
    example: 'Buenos Aires'
  })
  city?: string;

  constructor(partial: Partial<UserResponseDto>) {
    const { id, name, email, address, phone, country, city } = partial;
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.country = country;
    this.city = city;
  }
}