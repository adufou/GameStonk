import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
    @IsNotEmpty()
        name: string;
}
