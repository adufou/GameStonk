import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '@/items/entities/item.entity';
import { ItemsController } from '@/items/items.controller';
import { ItemsService } from '@/items/items.service';

@Module({
    imports: [TypeOrmModule.forFeature([Item])],
    exports: [ItemsService],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
