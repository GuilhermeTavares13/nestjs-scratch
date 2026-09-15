import { Module } from '@nestjs/common'
import {AppController} from './app.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
    controllers: [AppController],
    providers: [UsersService],
    imports: [UsersModule]
})
export class AppModule {

}

