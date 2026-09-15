import {Injectable, Get, Param, Query, Post} from '@nestjs/common'
import { User } from '../types';
import CreateUserDto from '../dto/create-user.dto';

@Injectable()
export class UsersService {

    users: User[] = [
        {
            "id": 1,
            "name": "Guilherme"
        },
        {
            "id": 2,
            "name": "Maria"
        }
    ];

    findAll(): User[] {
        return this.users;
    }

    findOne(id: number): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    create(name: string): User {
        const newUser: User = 
            {
                "id": this.users.length,
                "name": name
            }

        this.users.push(newUser);
        return newUser;    
    }

    @Get("/users/:id")
    getUserId(@Param('id') id: Number) {
        return `user ${id}`
    }

    @Get("/users")
    getUserName(@Query('name') name: string) {
        if (!name) {
            return "All users"
        }

        return name;
    }

    @Post("/users")
    postUser(@Body() body: CreateUserDto) {
        return body;
    }

}