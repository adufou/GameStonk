import {
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DeleteResult,
    Repository,
} from 'typeorm';
import { MarketplacesService } from '@/marketplaces/marketplaces.service';
import { UsersService } from '@/users/users.service';
import { CreateWalletDto } from '@/wallets/dto/create-wallet.dto';
import { UpdateWalletDto } from '@/wallets/dto/update-wallet.dto';
import { Wallet } from '@/wallets/entities/wallet.entity';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
        @Inject(MarketplacesService)
        private marketplacesService: MarketplacesService,
        @Inject(UsersService)
        private usersService: UsersService,
    ) {}
    
    create(createWalletDto: CreateWalletDto): Promise<Wallet> {
        return this.walletRepository.save(createWalletDto); 
    }

    async findAllByMarketplaceForUser(marketplaceId: number, userId: number): Promise<Wallet[]> {
        const marketplace = await this.marketplacesService.findOne(marketplaceId);
        const user = await this.usersService.findOne(userId);
        
        if (marketplace && user) {
            return this.walletRepository.find({ where: {
                marketplace: marketplace,
                user: user,
            } });
        }
    }
    
    async update(id: number, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
        const wallet = await this.walletRepository.findOneBy({ id });
        
        if (wallet) {
            return this.walletRepository.save({
                ...wallet,
                ...updateWalletDto,
            });
        }
        
        // TODO what if no game ? How to return an error ?
    }
    
    remove(id: number): Promise<DeleteResult> {
        return this.walletRepository.delete(id);
    }
}
