import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "@/games/entities/game.entity";
import {Server} from "@/servers/entities/server.entity";
import {Blueprint} from "@/blueprints/entities/blueprint.entity";
import {Marketplace} from "@/marketplaces/entities/marketplace.entity";
import {ItemConfig} from "@/items/config/item.config";
import {ItemPrice} from "@/item-prices/entities/item-price.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
        id: number;
    
    @Column({ type: 'jsonb'} )
        config: ItemConfig

    @ManyToOne(() => Marketplace, marketplace => marketplace.items)
        marketplace: Marketplace;
    
    @ManyToOne(() => Blueprint, blueprint => blueprint.items)
        blueprint: Blueprint;

    @OneToMany(() => ItemPrice, itemPrice => itemPrice.item)
        itemPrices: ItemPrice[]
}
