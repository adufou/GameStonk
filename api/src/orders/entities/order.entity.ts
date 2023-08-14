import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemPrice } from '@/item-prices/entities/item-price.entity';
import { OrderType } from '@/orders/types/order-type';
import { Wallet } from '@/wallets/entities/wallet.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        type: OrderType;

    @Column()
        volume: number;

    @Column()
        filled: boolean;

    @Column()
        canceled: boolean;

    @OneToOne(() => ItemPrice, itemPrice => itemPrice.order)
        itemPrice: ItemPrice;
    
    @ManyToOne(() => Wallet, wallet => wallet.orders)
        wallet: Wallet;
}
