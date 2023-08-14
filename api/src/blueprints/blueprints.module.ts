import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blueprint } from '@/blueprints/entities/blueprint.entity';
import { BlueprintsController } from './blueprints.controller';
import { BlueprintsService } from './blueprints.service';

@Module({
    imports: [TypeOrmModule.forFeature([Blueprint])],
    exports: [BlueprintsService],
    controllers: [BlueprintsController],
    providers: [BlueprintsService],
})
export class BlueprintsModule {}
