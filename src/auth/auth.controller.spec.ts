import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';
import { AuthService } from './auth.service';
import { hash, compare } from 'bcrypt'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hashedPassword = await hash('123456º', 10);
    const mockUserService: Partial<UsersService> = {
      findOneByEmail: (email:string) =>{ 
        if (email === 'johndou@email.com') {
         return Promise.resolve({
          email: 'johndou@email.com',
          password: hashedPassword,
          administrador: 'user',
         } as User);
        } else {
          return Promise.resolve(undefined);
        }
      },
      create: (entityLike?: Partial<User>): Promise <User> => 
      Promise.resolve({
        ...entityLike,
        administrador: 'user',
        id: '1234fs-1234fs-1234fs-1234fs',
      } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService,
        {provide: getRepositoryToken(User), useValue:{}},
                  {provide: JwtService, useValue: {signAsync: () =>Promise.resolve('mockJwtToken')},
      },
                  {provide: UsersService, useValue: mockUserService},
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  jest.spyOn(bcrypt, 'compare').mockImplementation(async (password: string, hashed: string) => {
    return Promise.resolve(password === '123456' && hashed === await hash('123456º', 10));
  });

  jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); 



  const mockSignUpUser=new SignupAuthDto({
    name: 'John Doe',
    email: 'johndou@email.com',
    createdAt: '26/02/2024',
    password: '123456',
    passwordConfirm:'123456',
    address: 'Rua dos Bobos, nº 0',
    phone: '123456789',
  });

  const mockSignInUser= new SignInAuthDto({
    email: 'johndou@email.com',
    password: '123456',
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it ('signUp() should return a new UserResponseDto and create User', async () => {
    const user = await controller.signup(mockSignUpUser);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserResponseDto);
    expect(user).toHaveProperty('id');

  });
      it ('signIn() should return a token', async () => {
    const token = await controller.signin(mockSignInUser);
    expect(token).toBeDefined();
    expect(token).toHaveProperty('token');
  });
});
