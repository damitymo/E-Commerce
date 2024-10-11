import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { hash } from "bcrypt";
import { AppModule } from "src/app.module";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { TypeOrmTestModule } from "test/typeorm-testing-config";
import * as request from 'supertest';

describe ('Users', () => {
    let app: INestApplication;
    let authToken: string;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, TypeOrmTestModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        usersService = moduleFixture.get<UsersService>(UsersService);

        const hashedPassword=await hash('123456', 10);
        jest.spyOn(usersService, 'findOneByEmail').mockImplementation(async (email) => {
            if (email === 'johndou@email.com') {
                return Promise.resolve({
                    email: 'johndou@email.com',
                    password: hashedPassword,
                    administrador: 'user',
                } as User);
            } else {
                return Promise.resolve(undefined);
            }
        });

        jest.spyOn(usersService, 'findAll').mockImplementation(async () => {
            return Promise.resolve([
                {
                    email: 'johndou@email.com',
                    administrador: 'user',
                },
            ] as User[]);
        });
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/signin')
            .send({
                email: 'johndou@email.com',
                password: '123456',
            });

        authToken = loginResponse.body['token'];
});

afterEach(async () => {
    await app.close();
});

it ('/users (GET) returns arrays with users and OK status code', async () => {
    const req= await request(app.getHttpServer())
    .get('/users')
    .set('Authorization', `Bearer ${authToken}`);

    expect(req.status).toBe(HttpStatus.OK);
    expect(req.body).toBeInstanceOf(Array);
});
});