import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketplaceDto } from '@/marketplaces/dto/create-marketplace.dto';

export class UpdateMarketplaceDto extends PartialType(CreateMarketplaceDto) {}
