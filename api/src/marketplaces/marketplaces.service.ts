import {
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DeleteResult,
    Repository,
} from 'typeorm';
import { CreateMarketplaceDto } from '@/marketplaces/dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from '@/marketplaces/dto/update-marketplace.dto';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { ServersService } from '@/servers/servers.service';

@Injectable()
export class MarketplacesService {
    constructor(
        @InjectRepository(Marketplace)
        private marketplaceRepository: Repository<Marketplace>,
        @Inject(ServersService)
        private serversService: ServersService,
    ) {}
    
    create(createMarketplaceDto: CreateMarketplaceDto): Promise<Marketplace> {
        return this.marketplaceRepository.save(createMarketplaceDto);
    }
    
    findAllByServer(serverId: number): Promise<Marketplace[]> {
        return this.serversService.getMarketplaces(serverId);
    }
    
    findOne(id: number): Promise<Marketplace | null> {
        return this.marketplaceRepository.findOneBy({ id });
    }
    
    async update(id: number, updateMarketplaceDto: UpdateMarketplaceDto): Promise<Marketplace> {
        const marketplace = await this.marketplaceRepository.findOneBy({ id });
        
        if (marketplace) {
            return this.marketplaceRepository.save({
                ...marketplace,
                ...updateMarketplaceDto,
            });

            // TODO what if no game ? How to return an error ?
        }
    }   
    
    remove(id: number): Promise<DeleteResult> {
        return this.marketplaceRepository.delete(id);
    }
}
