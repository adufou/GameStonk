import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateMarketplaceDto } from '@/marketplaces/dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from '@/marketplaces/dto/update-marketplace.dto';
import { MarketplacesService } from '@/marketplaces/marketplaces.service';

@Controller('marketplaces')
export class MarketplacesController {
    constructor(private readonly marketplacesService: MarketplacesService) {}

  @Post()
    create(@Body() createMarketplaceDto: CreateMarketplaceDto) {
        return this.marketplacesService.create(createMarketplaceDto);
    }

  @Get()
  findAll() {
      return this.marketplacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.marketplacesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketplaceDto: UpdateMarketplaceDto) {
      return this.marketplacesService.update(+id, updateMarketplaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
      return this.marketplacesService.remove(+id);
  }
}
