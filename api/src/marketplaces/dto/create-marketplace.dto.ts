import { IsNotEmpty } from 'class-validator';
import { Server } from '@/servers/entities/server.entity';

export class CreateMarketplaceDto {
    @IsNotEmpty()
        name: string;
    
    server: Server;
}
