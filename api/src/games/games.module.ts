import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "./entities/game.entity";
import {Server} from "../servers/entities/server.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    exports: [GamesService],
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule {}
