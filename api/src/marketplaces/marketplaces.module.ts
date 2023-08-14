import { Module } from '@nestjs/common';
import { MarketplacesService } from './marketplaces.service';
import { MarketplacesController } from './marketplaces.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "@/games/entities/game.entity";
import {GamesService} from "@/games/games.service";
import {Marketplace} from "@/marketplaces/entities/marketplace.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Marketplace])],
    exports: [MarketplacesService],
  controllers: [MarketplacesController],
  providers: [MarketplacesService],
})
export class MarketplacesModule {}
