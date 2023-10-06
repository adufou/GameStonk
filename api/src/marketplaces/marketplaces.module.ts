import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '@/games/entities/game.entity';
import { GamesService } from '@/games/games.service';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { MarketplacesController } from '@/marketplaces/marketplaces.controller';
import { MarketplacesService } from '@/marketplaces/marketplaces.service';
import { Server } from '@/servers/entities/server.entity';
import { ServersService } from '@/servers/servers.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Marketplace]),
        TypeOrmModule.forFeature([Server]),
        TypeOrmModule.forFeature([Game]),
    ],
    exports: [MarketplacesService],
    controllers: [MarketplacesController],
    providers: [MarketplacesService, ServersService, GamesService],
})
export class MarketplacesModule {}
