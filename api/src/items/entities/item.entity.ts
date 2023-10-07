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
import { Wallet } from '@/wallets/entities/wallet.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
        id: number;
    
    @Column({ type: 'jsonb' } )
        config: ItemConfig;

    @ManyToOne(() => Marketplace, marketplace => marketplace.items, { onDelete: 'CASCADE' })
        marketplace: Marketplace;
    
    @ManyToOne(() => Blueprint, blueprint => blueprint.items, { onDelete: 'CASCADE' })
        blueprint: Blueprint;
    
    @ManyToOne(() => Wallet, wallet => wallet.items, { onDelete: 'CASCADE' })
        wallet: Wallet;

    @OneToMany(() => ItemPrice, itemPrice => itemPrice.item)
        itemPrices: ItemPrice[];
}
