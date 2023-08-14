import { Module } from '@nestjs/common';
import { BlueprintsService } from './blueprints.service';
import { BlueprintsController } from './blueprints.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "@/games/entities/game.entity";
import {GamesService} from "@/games/games.service";
import {Blueprint} from "@/blueprints/entities/blueprint.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Blueprint])],
    exports: [BlueprintsService],
  controllers: [BlueprintsController],
  providers: [BlueprintsService],
})
export class BlueprintsModule {}
