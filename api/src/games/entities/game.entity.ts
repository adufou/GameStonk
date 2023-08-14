import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Server } from '@/servers/entities/server.entity';
import {Blueprint} from "@/blueprints/entities/blueprint.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ unique: true })
        name: string;
    
    @OneToMany(() => Server, server => server.game)
        servers: Server[];

    @OneToMany(() => Blueprint, blueprint => blueprint.game)
        blueprints: Blueprint[];
}
