import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { MarketplacesController } from '@/marketplaces/marketplaces.controller';
import { MarketplacesService } from '@/marketplaces/marketplaces.service';

@Module({
    imports: [TypeOrmModule.forFeature([Marketplace])],
    exports: [MarketplacesService],
    controllers: [MarketplacesController],
    providers: [MarketplacesService],
})
export class MarketplacesModule {}
