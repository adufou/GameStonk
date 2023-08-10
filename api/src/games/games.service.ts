import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Game} from "./entities/game.entity";
import {Repository} from "typeorm";

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>
    ) {}
    
    create(createGameDto: CreateGameDto) {
        return this.gameRepository.save(createGameDto)
    }
    
    findAll(): Promise<Game[]> {
        return this.gameRepository.find();
    }
    
    findOne(id: number): Promise<Game | null> {
        return this.gameRepository.findOneBy({ id })
    }
    
    async update(id: number, updateGameDto: UpdateGameDto) {
        const game = await this.gameRepository.findOneBy({ id });
        
        if (game) {
            return this.gameRepository.save({
                ...game,
                ...updateGameDto,
            })
        }
        
        // TODO what if no game ? How to return an error ?
    }
    
    remove(id: number) {
        return this.gameRepository.delete(id);
    }
}
