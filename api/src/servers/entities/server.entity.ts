import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from '@/games/entities/game.entity';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';

@Entity()
export class Server {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;
    
    @ManyToOne(() => Game, game => game.servers)
        game: Game;
    
    @OneToMany(() => Marketplace, marketplace => marketplace.server)
        marketplaces: Marketplace[];
}
