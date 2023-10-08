import {
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DeleteResult,
    Repository,
} from 'typeorm';
import { GamesService } from '@/games/games.service';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { CreateServerDto } from '@/servers/dto/create-server.dto';
import { UpdateServerDto } from '@/servers/dto/update-server.dto';
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
    
    find(id: number): Promise<Server> {
        return this.serverRepository.findOneBy({ id });
    }
    
    async findAllByGame(gameId: number): Promise<Server[]> {
        return this.gamesService.getServers(gameId);
    }

    async getMarketplaces(id: number): Promise<Marketplace[]> {
        const server = await this.serverRepository.findOne({
            where: { id },
            relations: ['marketplaces'],
        });

        return server?.marketplaces.sort((m1, m2) => {
            if (m1.name < m2.name) {
                return -1;
            }
            if (m1.name > m2.name) {
                return 1;
            }
            return 0;
        }) ?? [];
    }
    
    async update(id: number, updateServerDto: UpdateServerDto): Promise<Server> {
        const server = await this.serverRepository.findOneBy({ id });

        if (server) {
            return this.serverRepository.save({
                ...server,
                ...updateServerDto,
            });
        }

        // TODO what if no game ? How to return an error ?
    }
    
    remove(id: number): Promise<DeleteResult> {
        return this.serverRepository.delete(id);
    }
}
