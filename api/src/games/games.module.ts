import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '@/games/entities/game.entity';
import { GamesController } from '@/games/games.controller';
import { GamesService } from '@/games/games.service';

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    exports: [GamesService],
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule {}
