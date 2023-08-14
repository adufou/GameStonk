import { PartialType } from '@nestjs/mapped-types';
import { CreateBlueprintDto } from '@/blueprints/dto/create-blueprint.dto';

export class UpdateBlueprintDto extends PartialType(CreateBlueprintDto) {}
