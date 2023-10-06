import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateMarketplaceDto } from '@/marketplaces/dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from '@/marketplaces/dto/update-marketplace.dto';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { MarketplacesService } from '@/marketplaces/marketplaces.service';

@Controller('marketplaces')
export class MarketplacesController {
    constructor(private readonly marketplacesService: MarketplacesService) {}

    @Post()
    create(@Body() createMarketplaceDto: CreateMarketplaceDto): Promise<Marketplace> {
        return this.marketplacesService.create(createMarketplaceDto);
    }
    
    @Get('/server/:id')
    findAllByServer(@Param('id') id: string): Promise<Marketplace[]> {
        return this.marketplacesService.findAllByServer(+id);
    }
    
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Marketplace> {
        return this.marketplacesService.findOne(+id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMarkeplaceDto: UpdateMarketplaceDto): Promise<Marketplace> {
        return this.marketplacesService.update(+id, updateMarkeplaceDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.marketplacesService.remove(+id);
    }
}
