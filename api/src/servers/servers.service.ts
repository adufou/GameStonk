import {Inject, Injectable} from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Server} from "./entities/server.entity";
import {Repository} from "typeorm";
import {Game} from "../games/entities/game.entity";
import {GamesService} from "../games/games.service";

@Injectable()
export class ServersService {
    constructor(
        @InjectRepository(Server)
        private serverRepository: Repository<Server>,
        @Inject(GamesService)
        private gamesService: GamesService,
    ) {}
    
    create(createServerDto: CreateServerDto): Promise<Server> {
        return this.serverRepository.save(createServerDto);
    }
    
    async findAllByGame(id: number): Promise<Server[]> {
        return this.gamesService.getServers(id);
    }
    
    findOne(id: number) {
        return `This action returns a #${id} server`;
    }
    
    update(id: number, updateServerDto: UpdateServerDto) {
        return `This action updates a #${id} server`;
    }
    
    remove(id: number) {
        return `This action removes a #${id} server`;
    }
}
