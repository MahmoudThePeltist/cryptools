import React from 'react';
import { ethers } from 'ethers';
import { networks } from '../utils/networkDefinitions.utils';
import { useSelectedChainId } from './useSelectedChainId';

export const useChainData = () => {
    const chainId: number = useSelectedChainId();
    if(!networks[chainId]) throw("Moud's Cryptools: Chain not supported.");

    return React.useMemo(() => networks[chainId], [chainId]);
}

export const useGetProvider = () => {
    const chainId: number = useSelectedChainId();
    if(!networks[chainId]) throw("Moud's Cryptools: Chain not supported.")

    const network = networks[chainId];

    return React.useMemo(() => {
        if(network.url)
            return new ethers.providers.JsonRpcProvider(network.url);
            
        return ethers.getDefaultProvider(chainId, {etherscan: network.scan});
    }, [network]);
}