import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository <User> ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
  const newUser= this.usersRepository.create(createUserDto);
  return await this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> { // id ahora es string
    return await this.usersRepository.findOne({ where: { id } });
  }
  

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> { // id ahora es string
    await this.usersRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }


  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  pagination(page: number, limit: number): Promise<User[]> {
    return this.usersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }
  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({email});
  }
  async findOneBy(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id }); 
  }
}
