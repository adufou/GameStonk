import {
    Controller,
    Get,
    Post,
    Body,
    Param,
} from '@nestjs/common';
import { CreateServerDto } from '@/servers/dto/create-server.dto';
import { Server } from '@/servers/entities/server.entity';
import { ServersService } from '@/servers/servers.service';

@Controller('servers')
export class ServersController {
    constructor(private readonly serversService: ServersService) {}

    @Post()
    create(@Body() createServerDto: CreateServerDto): Promise<Server> {
        return this.serversService.create(createServerDto);
    }

    @Get('/game/:id')
    findAllByGame(@Param('id') id: string): Promise<Server[]> {
        return this.serversService.findAllByGame(+id);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.serversService.findOne(+id);
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    //     return this.serversService.update(+id, updateServerDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.serversService.remove(+id);
    // }
}
