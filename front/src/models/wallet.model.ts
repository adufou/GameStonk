import MarketplaceModel from '@/models/marketplace.model';
import UserModel from '@/models/user.model';

interface WalletModel {
    id: number,
    name: string,
    marketplace: MarketplaceModel['id']
    user: UserModel['id']
    // items: ItemModel[]
}

export default WalletModel;
