import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Server} from "./entities/server.entity";
import {GamesService} from "../games/games.service";
import {Game} from "../games/entities/game.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Server]),
        TypeOrmModule.forFeature([Game]),
    ],
    exports: [ServersService],
    controllers: [ServersController],
    providers: [ServersService, GamesService],
})
export class ServersModule {}
