import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "@/games/entities/game.entity";
import {GamesService} from "@/games/games.service";
import {Order} from "@/orders/entities/order.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    exports: [OrdersService],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
