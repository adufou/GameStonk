import { Marketplace } from '@/marketplaces/entities/marketplace.entity';

export class MarketplaceWithServerIdSerialization extends Marketplace {
    serverId: number;
}
