import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "../../games/entities/game.entity";

@Entity()
export class Server {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @ManyToOne(() => Game, (game) => game.servers)
    game: Game;
}
