import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Blueprint } from '@/blueprints/entities/blueprint.entity';
import { ItemPrice } from '@/item-prices/entities/item-price.entity';
import { ItemConfig } from '@/items/config/item.config';
import { Marketplace } from '@/marketplaces/entities/marketplace.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
        id: number;
    
    @Column({ type: 'jsonb' } )
        config: ItemConfig;

    @ManyToOne(() => Marketplace, marketplace => marketplace.items)
        marketplace: Marketplace;
    
    @ManyToOne(() => Blueprint, blueprint => blueprint.items)
        blueprint: Blueprint;

    @OneToMany(() => ItemPrice, itemPrice => itemPrice.item)
        itemPrices: ItemPrice[];
}
