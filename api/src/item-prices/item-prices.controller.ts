import { Controller } from '@nestjs/common';
import { ItemPricesService } from '@/item-prices/item-prices.service';

@Controller('item-prices')
export class ItemPricesController {
    constructor(private readonly itemPricesService: ItemPricesService) {}

    // @Post()
    //   create(@Body() createItemPriceDto: CreateItemPriceDto) {
    //       return this.itemPricesService.create(createItemPriceDto);
    //   }
    //
    // @Get()
    // findAll() {
    //     return this.itemPricesService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.itemPricesService.findOne(+id);
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateItemPriceDto: UpdateItemPriceDto) {
    //     return this.itemPricesService.update(+id, updateItemPriceDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.itemPricesService.remove(+id);
    // }
}
