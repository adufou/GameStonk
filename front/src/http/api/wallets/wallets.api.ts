import MarketplaceModel from '@/models/marketplace.model';
import UserModel from '@/models/user.model';
import WalletModel from '@/models/wallet.model';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';
import ApiResponseStatus from '@/types/ApiResponseStatus';

const addWallet = (wallet: {
    user: UserModel['id'],
    marketplace: MarketplaceModel['id'],
    name: string,
}): Promise<ApiResponseBody<WalletModel>> =>
    apiCall('wallets', 'POST', wallet);

const deleteWallet = (wallet: WalletModel): Promise<ApiResponseStatus> =>
    apiCall(`wallets/${ wallet.id }`, 'DELETE');

const getWallet = (id: WalletModel['id']): Promise<ApiResponseBody<WalletModel>> => 
    apiCall(`wallets/${ id }`, 'GET');

const getWalletsByMarketplaceForUser = (
    body: {
        marketplaceId: MarketplaceModel['id'],
        userId: UserModel['id'],
    }): Promise<ApiResponseBody<WalletModel[]>> =>
    apiCall('wallets/marketplaceForUser', 'POST', body);

const updateWallet = (wallet: WalletModel): Promise<ApiResponseBody<WalletModel>> =>
    apiCall(`wallets/${ wallet.id }`, 'PATCH', wallet );

const walletsApi = { 
    addWallet,
    deleteWallet,
    getWallet,
    getWalletsByMarketplaceForUser,
    updateWallet,
};

export default walletsApi;
