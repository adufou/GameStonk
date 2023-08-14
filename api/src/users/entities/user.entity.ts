import {
    Entity,
    Column,
    PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import {Wallet} from "@/wallets/entities/wallet.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ unique: true })
        email: string;

    @Column()
        firstName: string;

    @Column()
        lastName: string;

    @Column()
        password: string;

    @Column({ default: true })
        isActive: boolean;
    
    @OneToMany(() => Wallet, wallet => wallet.user)
        wallets: Wallet[]
}
