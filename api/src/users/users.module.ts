import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UsersService],
    providers: [UsersService],
    controllers: [UsersController],
    // controllers: [UsersController],
})
export class UsersModule {}
