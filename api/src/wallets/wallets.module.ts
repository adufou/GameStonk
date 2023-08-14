import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "@/games/entities/game.entity";
import {GamesService} from "@/games/games.service";
import {Wallet} from "@/wallets/entities/wallet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    exports: [WalletsService],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
