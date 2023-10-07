import ServerModel from '@/models/server.model';

interface MarketplaceModel {
    id: number;
    server: ServerModel['id'];
    serverId: ServerModel['id'];
    name: string;
}

export default MarketplaceModel;
