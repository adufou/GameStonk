import { Controller } from '@nestjs/common';
import { WalletsService } from '@/wallets/wallets.service';

@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    // @Post()
    //   create(@Body() createWalletDto: CreateWalletDto) {
    //       return this.walletsService.create(createWalletDto);
    //   }
    //
    // @Get()
    // findAll() {
    //     return this.walletsService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.walletsService.findOne(+id);
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    //     return this.walletsService.update(+id, updateWalletDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.walletsService.remove(+id);
    // }
}
