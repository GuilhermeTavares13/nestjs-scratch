import { Controller, Get } from '@nestjs/common'

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
}