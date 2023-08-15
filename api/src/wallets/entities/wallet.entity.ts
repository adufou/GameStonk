import {
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '@/items/entities/item.entity';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { User } from '@/users/entities/user.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
        id: number;

    @ManyToOne(() => Marketplace, marketplace => marketplace.wallets)
        marketplace: Marketplace;

    @ManyToOne(() => User, user => user.wallets)
        user: User;
    
    @OneToMany(() => Item, item => item.wallet)
        items: Item[];
}
