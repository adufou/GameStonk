import GameModel from '@/models/game.model';
import MarketplaceModel from '@/models/marketplace.model';

interface ServerModel {
    id: number;
    game: GameModel['id'];
    marketplaces: MarketplaceModel[];
    name: string;
}

export default ServerModel;
