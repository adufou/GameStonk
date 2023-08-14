import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "@/games/entities/game.entity";
import {GamesService} from "@/games/games.service";
import {Item} from "@/items/entities/item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Item])],
    exports: [ItemsService],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
