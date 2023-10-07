import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemPrice } from '@/item-prices/entities/item-price.entity';
import { OrderType } from '@/orders/types/order-type';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        type: OrderType;

    @Column()
        volume: number;

    @OneToOne(() => ItemPrice, itemPrice => itemPrice.order)
        itemPrice: ItemPrice;
}
