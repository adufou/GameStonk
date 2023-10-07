import { IsInt } from 'class-validator';

export class FindByMarketplaceForUserDto {
    @IsInt()
        marketplaceId: number;

    @IsInt()
        userId: number;
}
