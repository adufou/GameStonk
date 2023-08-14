import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "@/items/entities/item.entity";
import {Order} from "@/orders/entities/order.entity";

@Entity()
export class ItemPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    // https://wanago.io/2021/03/15/postgresql-typeorm-date-time/
    // Timestamp with time zone
    @Column({ type: 'timestamptz', nullable: true })
    timestamp: Date;

    @ManyToOne(() => Item, item => item.itemPrices)
    item: Item

    @OneToOne(() => Order, order => order.itemPrice)
    order: Order
}
