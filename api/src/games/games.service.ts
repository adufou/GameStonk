import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DeleteResult,
    Repository,
} from 'typeorm';
import { CreateGameDto } from '@/games/dto/create-game.dto';
import { UpdateGameDto } from '@/games/dto/update-game.dto';
import { Game } from '@/games/entities/game.entity';
import { Server } from '@/servers/entities/server.entity';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>
    ) {}
    
    create(createGameDto: CreateGameDto): Promise<Game> {
        return this.gameRepository.save(createGameDto);
    }
    
    findAll(): Promise<Game[]> {
        return this.gameRepository.find();
    }
    
    findOne(id: number): Promise<Game | null> {
        return this.gameRepository.findOneBy({ id });
    }
    
    async getServers(id: number): Promise<Server[]> {
        const game = await this.gameRepository.findOne({
            where: { id },
            relations: ['servers'],
        });

        return game.servers;
    }
    
    async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
        const game = await this.gameRepository.findOneBy({ id });
        
        if (game) {
            return this.gameRepository.save({
                ...game,
                ...updateGameDto,
            });
        }
        
        // TODO what if no game ? How to return an error ?
    }
    
    remove(id: number): Promise<DeleteResult> {
        return this.gameRepository.delete(id);
    }
}
