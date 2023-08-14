import { PartialType } from '@nestjs/mapped-types';
import { CreateItemPriceDto } from '@/item-prices/dto/create-item-price.dto';

export class UpdateItemPriceDto extends PartialType(CreateItemPriceDto) {}
