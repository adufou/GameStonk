import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateGameDto } from '@/games/dto/create-game.dto';
import { UpdateGameDto } from '@/games/dto/update-game.dto';
import { Game } from '@/games/entities/game.entity';
import { GamesService } from '@/games/games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}
    
    @Post()
    create(@Body() createGameDto: CreateGameDto): Promise<Game> {
        return this.gamesService.create(createGameDto);
    }
    
    @Get()
    findAll(): Promise<Game[]> {
        return this.gamesService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Game> {
        return this.gamesService.findOne(+id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto): Promise<Game> {
        return this.gamesService.update(+id, updateGameDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.gamesService.remove(+id);
    }
}
