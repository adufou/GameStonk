import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPrice } from '@/item-prices/entities/item-price.entity';
import { ItemPricesController } from '@/item-prices/item-prices.controller';
import { ItemPricesService } from '@/item-prices/item-prices.service';

@Module({
    imports: [TypeOrmModule.forFeature([ItemPrice])],
    exports: [ItemPricesService],
    controllers: [ItemPricesController],
    providers: [ItemPricesService],
})
export class ItemPricesModule {}
