import { Module } from '@nestjs/common';
import { ItemPricesService } from './item-prices.service';
import { ItemPricesController } from './item-prices.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "@/games/entities/game.entity";
import {GamesService} from "@/games/games.service";
import {ItemPrice} from "@/item-prices/entities/item-price.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ItemPrice])],
    exports: [ItemPricesService],
  controllers: [ItemPricesController],
  providers: [ItemPricesService],
})
export class ItemPricesModule {}
