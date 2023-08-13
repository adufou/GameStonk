import { PartialType } from '@nestjs/mapped-types';
import { CreateServerDto } from '@/servers/dto/create-server.dto';

export class UpdateServerDto extends PartialType(CreateServerDto) {}
