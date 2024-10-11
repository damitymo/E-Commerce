import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { Role } from 'src/users/enum/role.enum';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUserService: Partial<UsersService>={
      findOneByEmail: () => Promise.resolve(undefined),
      create: (entityLike?: Partial <User>)=>
        Promise.resolve({
          ...entityLike,
          administrador: 'user',
          id: '1234fs-1234fs-1234fs-1234fs',
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
          {provide: getRepositoryToken(User), useValue: {}},
          {provide: UsersService, useValue: mockUserService},
          {provide: JwtService, useValue: {}},

      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const mockUser= new SignupAuthDto({
    name: 'John Doe',
    createdAt: '26/02/2024',
    email: 'johndou@email.com',
    password: '123456',
    passwordConfirm: '123456',
    address: 'Calle 123',
    phone: '1234567890',
  });
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it ('signUp() create a new user with encrypted password', async () => {
    const user = await service.signUp(mockUser);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('administrador', Role.User);
    expect(user).toHaveProperty('password');
  });
});
