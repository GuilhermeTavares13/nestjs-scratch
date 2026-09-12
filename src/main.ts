import { Controller, Module, Get } from '@nestjs/common'

@Controller() // decorator
class AppController {

    @Get()
    getRootRoute() {

    }
}