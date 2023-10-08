import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateServerDto } from '@/servers/dto/create-server.dto';
import { UpdateServerDto } from '@/servers/dto/update-server.dto';
import { Server } from '@/servers/entities/server.entity';
import { ServersService } from '@/servers/servers.service';

@Controller('servers')
export class ServersController {
    constructor(private readonly serversService: ServersService) {}

    @Post()
    create(@Body() createServerDto: CreateServerDto): Promise<Server> {
        return this.serversService.create(createServerDto);
    }

    @Get(':id')
    find(@Param('id') id: string): Promise<Server> {
        return this.serversService.find(+id);
    }
    
    @Get('/game/:id')
    findAllByGame(@Param('id') id: string): Promise<Server[]> {
        return this.serversService.findAllByGame(+id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto): Promise<Server> {
        return this.serversService.update(+id, updateServerDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.serversService.remove(+id);
    }
}
