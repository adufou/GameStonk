import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {User} from "./users/user.entity";

@Module({
    imports: [
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
            entities: [
                User,
            ],
            /* https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei
              We set the synchronize option to true, which means that TypeORM will automatically generate database 
              tables based on the entities. However, this option should be used with caution in production because it 
              can cause data loss and conflicts.
             */
            synchronize: true,
            autoLoadEntities: true,
            retryDelay: 5000,
            retryAttempts: 25,
        }),
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
