import {IsInt, IsNotEmpty} from "class-validator";
import {Game} from "../../games/entities/game.entity";

export class CreateServerDto {
    @IsNotEmpty()
    name: string;
    
    game: Game;
}
