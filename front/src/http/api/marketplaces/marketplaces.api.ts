import MarketplaceModel from '@/models/marketplace.model';
import ServerModel from '@/models/server.model';
import { apiCall } from '@/tools/apiCall';
import ApiResponseBody from '@/types/ApiResponseBody';
import ApiResponseStatus from '@/types/ApiResponseStatus';

const addMarketplace = (marketplace: Partial<MarketplaceModel>): Promise<ApiResponseBody<MarketplaceModel>> => 
    apiCall('marketplaces', 'POST', marketplace);

const deleteMarketplace = (marketplace: MarketplaceModel): Promise<ApiResponseStatus> =>
    apiCall(`marketplaces/${ marketplace.id }`, 'DELETE');

const getMarketplace = (id: MarketplaceModel['id']): Promise<ApiResponseBody<MarketplaceModel>> =>
    apiCall(`marketplaces/${ id }`, 'GET');

const getMarketplacesFromServer = (serverId: ServerModel['id']): Promise<ApiResponseBody<MarketplaceModel[]>> => 
    apiCall(`marketplaces/server/${ serverId }`, 'GET');

const updateMarketplace = (marketplace: MarketplaceModel): Promise<ApiResponseBody<MarketplaceModel>> =>
    apiCall(`marketplaces/${ marketplace.id }`, 'PATCH', marketplace);

const marketplacesApi = {
    addMarketplace,
    deleteMarketplace,
    getMarketplace,
    getMarketplacesFromServer,
    updateMarketplace,
};

export default marketplacesApi;
