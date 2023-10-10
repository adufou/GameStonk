import React from 'react';
import { useQuery } from 'react-query';
import WalletCard from '@/components/Wallet/WalletCard';
import walletsApi from '@/http/api/wallets/wallets.api';
import WalletModel from '@/models/wallet.model';

interface WalletCellProps {
    wallet: Pick<WalletModel, 'name' | 'id'>
}

const WalletCell = ({ wallet: propsWallet }: WalletCellProps): React.ReactElement => {
    const {
        data: getWalletData,
        isSuccess: getWalletIsSuccess,
    } = useQuery(['wallets', propsWallet.id], () => walletsApi.getWallet(propsWallet.id));

    if (getWalletIsSuccess) {
        return(
            <div className='wallet-cell'>
                <WalletCard wallet={getWalletData?.body} />
            </div>
        );
    }
    
    return (<></>);
};

export default WalletCell;
