import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateGameDto } from '@/games/dto/create-game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {
    @IsInt()
        id: number;
}
