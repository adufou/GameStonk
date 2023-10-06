import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '@/games/entities/game.entity';
import { GamesService } from '@/games/games.service';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { MarketplacesService } from '@/marketplaces/marketplaces.service';
import { Server } from '@/servers/entities/server.entity';
import { ServersService } from '@/servers/servers.service';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { Wallet } from '@/wallets/entities/wallet.entity';
import { WalletsController } from '@/wallets/wallets.controller';
import { WalletsService } from '@/wallets/wallets.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet]),
        TypeOrmModule.forFeature([Game]),
        TypeOrmModule.forFeature([Marketplace]),
        TypeOrmModule.forFeature([Server]),
        TypeOrmModule.forFeature([User]),
    ],
    exports: [WalletsService],
    controllers: [WalletsController],
    providers: [
        WalletsService,
        GamesService,
        MarketplacesService,
        ServersService,
        UsersService,
    ],
})
export class WalletsModule {}
