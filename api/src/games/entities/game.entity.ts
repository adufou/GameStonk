import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Server} from "../../servers/entities/server.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;
    
    @OneToMany(() => Server, (server) => server.game)
    servers: Server[];
}
