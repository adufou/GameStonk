import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '@/games/entities/game.entity';
import { GamesService } from '@/games/games.service';
import { Server } from '@/servers/entities/server.entity';
import { ServersController } from '@/servers/servers.controller';
import { ServersService } from '@/servers/servers.service';

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
