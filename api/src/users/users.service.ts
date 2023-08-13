import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DeleteResult,
    Repository,
} from 'typeorm';
import { RegisterDto } from '@/auth/dto/login-register.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    create(user: RegisterDto): Promise<User> {
        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    // update(id: number, updateGameDto: UpdateUserDto) {
    //     // noop
    // }

    remove(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }
}
