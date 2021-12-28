import React from 'react';
import { ethers } from 'ethers';
import { networks } from '../utils/networkDefinitions.utils';

export const useGetProvider = (chainId: number) => {
    if(!networks[chainId]) throw("Moud's Cryptools: Chain not supported.")

    return React.useMemo(() => {
        return ethers.getDefaultProvider(chainId, {
            etherscan: networks[chainId].scan
        });
    }, [chainId]);
}