import {
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';
import { Order } from '@/orders/entities/order.entity';
import { User } from '@/users/entities/user.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
        id: number;

    @ManyToOne(() => Marketplace, marketplace => marketplace.wallets)
        marketplace: Marketplace;

    @ManyToOne(() => User, user => user.wallets)
        user: User;
    
    @OneToMany(() => Order, order => order.wallet)
        orders: Order[];
}
