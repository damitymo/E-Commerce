import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(private readonly usersService:UsersService,
              private jwtService:JwtService
  ) {}

  async signin(credentials: SignInAuthDto,) {
    const user=this.usersService.findOneByEmail(credentials.email);
    if (!user){
      throw new HttpException('User not found',404);
    }
    const isPasswordMatching = await compare(
      credentials.password,
      (await user).password
    )
    if (!isPasswordMatching){
      throw new HttpException('Invalid credentials',HttpStatus.UNAUTHORIZED);
    }
    const token = await this.createToken(await user);
    return {token};
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async signUp (signUpUser: SignupAuthDto){
   if (signUpUser.password !== signUpUser.passwordConfirm){
     throw new HttpException('Passwords do not match',400); 
   }
   signUpUser.password=await hash (signUpUser.password, 10);
   const newUser=await this.usersService.create(signUpUser);
   return newUser;
  }

  private async createToken(user: User){
const payload={
  id:user.id, 
  email:user.email,
  roles:user.administrador,
};
 return  this.jwtService.signAsync(payload);  }
}
