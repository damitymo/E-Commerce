import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsersRepository {
    
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndou@gmail.com',
            password: '123'

        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'janeduo@gmail.com',
            password: '123'
        },
        {
            id: 3,
            name: 'Alice',
            email: 'alice@gmail.com',
            password: '123'
        },
    ];

    getUsers() {
        return this.users;
        }
    remove() {}

    update() {}

    findOne() {}

    create(createUserDto: CreateUserDto) {
        const id = this.users.length + 1;
        const newUser = {
            id,
            ...createUserDto,
        };
        this.users.push(newUser);
        return newUser;
        
    }

    findOneByEmail(email: string) {
            return this.users.find(user => user.email === email);
        }
 }

