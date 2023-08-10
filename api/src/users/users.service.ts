import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import { User } from './entities/user.entity';
import {UpdateUserDto} from "./dto/update-user.dto";
import {RegisterDto} from "../auth/dto/login-register.dto";

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

    update(id: number, updateGameDto: UpdateUserDto) {
        // noop
    }

    remove(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }
}
