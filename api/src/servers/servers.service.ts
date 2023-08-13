import {
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamesService } from '@/games/games.service';
import { CreateServerDto } from '@/servers/dto/create-server.dto';
import { Server } from '@/servers/entities/server.entity';

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
    
    // findOne(id: number) {
    //     return `This action returns a #${ id } server`;
    // }
    //
    // update(id: number, updateServerDto: UpdateServerDto) {
    //     return `This action updates a #${ id } server`;
    // }
    //
    // remove(id: number) {
    //     return `This action removes a #${ id } server`;
    // }
}
