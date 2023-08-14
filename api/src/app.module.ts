import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/auth/auth.module';
import { GamesModule } from '@/games/games.module';
import { ServersModule } from '@/servers/servers.module';
import { UsersModule } from '@/users/users.module';
import {MarketplacesModule} from "@/marketplaces/marketplaces.module";
import {WalletsModule} from "@/wallets/wallets.module";
import {ItemsModule} from "@/items/items.module";
import {BlueprintsModule} from "@/blueprints/blueprints.module";
import {OrdersModule} from "@/orders/orders.module";
import {ItemPricesModule} from "@/item-prices/item-prices.module";


@Module({ imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'stonkofus',
        password: 'password',
        database: 'postgres',
        /* https://docs.nestjs.com/techniques/database#auto-load-entities
         * Should not have to add one if registered in a forFeature
         */
        entities: [],
        /* https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei
         * We set the synchronize option to true, which means that TypeORM will automatically generate database 
         * tables based on the entities. However, this option should be used with caution in production because it 
         * can cause data loss and conflicts.
         */
        synchronize: true,
        autoLoadEntities: true,
        retryDelay: 5000,
        retryAttempts: 25,
            
    }),
    AuthModule,
    UsersModule,
    ServersModule,
    GamesModule,
    MarketplacesModule,
    WalletsModule,
    ItemsModule,
    BlueprintsModule,
    OrdersModule,
    ItemPricesModule,
] })
export class AppModule {}
