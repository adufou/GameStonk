import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlueprintsController } from '@/blueprints/blueprints.controller';
import { BlueprintsService } from '@/blueprints/blueprints.service';
import { Blueprint } from '@/blueprints/entities/blueprint.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blueprint])],
    exports: [BlueprintsService],
    controllers: [BlueprintsController],
    providers: [BlueprintsService],
})
export class BlueprintsModule {}
