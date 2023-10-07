import { IsNotEmpty } from 'class-validator';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { User } from '@/users/entities/user.entity';

export class CreateWalletDto {
    @IsNotEmpty()
        name: string;

    marketplace: Marketplace;
    
    user: User;
}
