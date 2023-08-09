import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'db',
          port: 5432,
          username: 'stonkofus',
          password: 'password',
          database: 'postgres',
          entities: [],
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
      GameModule,
      UserModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
