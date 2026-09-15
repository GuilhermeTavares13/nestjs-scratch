import { Controller, Get, Post, Put, Patch, Delete , Param, Query, Body } from '@nestjs/common'
import { UsersService } from './users/users.service';
import CreateUserDto from './dto/create-user.dto';

@Controller("/api") // decorator
export class AppController {

    constructor(private usersService: UsersService) {}

    @Get("/hi")
    getRootRoute() {
        return 'hi there!';
    }

    @Get("/bye")
    getByeThere() {
        return 'bye';
    }

    @Post("/message")
    postMessage() {
        return "created";
    }

    @Put("/message")
    putMessage() {
        return "updated";
    }

    @Patch("/message")
    patchMessage() {
        return "patched";
    }

    @Delete("/message")
    deleteMessage() {
        return "deleted";
    }
}