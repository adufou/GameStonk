import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '@/items/entities/item.entity';
import { Server } from '@/servers/entities/server.entity';
import { Wallet } from '@/wallets/entities/wallet.entity';

@Entity()
export class Marketplace {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @ManyToOne(() => Server, server => server.marketplaces)
        server: Server;

    @OneToMany(() => Wallet, wallet => wallet.marketplace)
        wallets: Wallet[];

    @OneToMany(() => Item, item => item.blueprint)
        items: Item[];
}
