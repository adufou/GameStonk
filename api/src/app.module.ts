import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { GameModule } from './game/game.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import AppDataSource from "./app.datasource";
import AppDatasource from "./app.datasource";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GameModule,
        AuthModule,
        UsersModule,
    ],
    // controllers: [AppController],
    // providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: AppDatasource) {}
}
