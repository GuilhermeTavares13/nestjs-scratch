import { Controller, Get, Post, Put, Patch, Delete , Param, Query, Body } from '@nestjs/common'

@Controller("/api") // decorator
export class AppController {

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
    postUser(@Body() body: Body) {
        return body;
    }
}