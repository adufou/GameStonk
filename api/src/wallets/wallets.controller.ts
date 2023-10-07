import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateWalletDto } from '@/wallets/dto/create-wallet.dto';
import { FindByMarketplaceForUserDto } from '@/wallets/dto/find-by-marketplace-for-user.dto';
import { UpdateWalletDto } from '@/wallets/dto/update-wallet.dto';
import { Wallet } from '@/wallets/entities/wallet.entity';
import { WalletsService } from '@/wallets/wallets.service';

@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Post()
    create(@Body() createWalletDto: CreateWalletDto): Promise<Wallet> {
        return this.walletsService.create(createWalletDto);
    }
    
    @Post('marketplaceForUser')
    findAllByMarketplaceForUser(
        @Body() findAllByMarketplaceForUserDto: FindByMarketplaceForUserDto
    ): Promise<Wallet[]> {
        return this.walletsService.findAllByMarketplaceForUser(
            findAllByMarketplaceForUserDto.marketplaceId, 
            findAllByMarketplaceForUserDto.userId,
        );
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto): Promise<Wallet> {
        return this.walletsService.update(+id, updateWalletDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.walletsService.remove(+id);
    }
}
