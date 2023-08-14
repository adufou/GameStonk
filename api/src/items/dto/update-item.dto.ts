import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from '@/items/dto/create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}
