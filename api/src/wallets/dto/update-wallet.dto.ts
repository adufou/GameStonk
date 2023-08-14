import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from '@/wallets/dto/create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {}
