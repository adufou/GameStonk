import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '@/wallets/entities/wallet.entity';
import { WalletsController } from '@/wallets/wallets.controller';
import { WalletsService } from '@/wallets/wallets.service';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    exports: [WalletsService],
    controllers: [WalletsController],
    providers: [WalletsService],
})
export class WalletsModule {}
