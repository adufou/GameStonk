import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { ServersController } from './servers.controller';
import { ServersService } from './servers.service';
import { Game } from '../games/entities/game.entity';
import { GamesService } from '../games/games.service';

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
