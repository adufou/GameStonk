import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "@/games/entities/game.entity";
import {BlueprintConfig} from "@/blueprints/config/blueprint.config";
import {Item} from "@/items/entities/item.entity";

@Entity()
export class Blueprint {
    @PrimaryGeneratedColumn()
        id: number;

    @ManyToOne(() => Game, game => game.blueprints)
        game: Game;
    
    @OneToMany(() => Item, item => item.blueprint)
        items: Item[]
    
    @Column({ type: "jsonb" })
        config: BlueprintConfig
}
