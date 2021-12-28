import React from 'react';
import { ethers } from 'ethers';
import { useGetProvider } from './useGetProvider';

export const useSelectedChainId = () => {
    return 1;
};

export const useGetBlockNumber = () => {
    const chainId = useSelectedChainId();
    const provider = useGetProvider(chainId);
    
    return React.useCallback( async () => {
        return await provider.getBlockNumber();
    }, [chainId, provider])
}

export const useBlockTransactions = () => {
    const chainId = useSelectedChainId();
    const provider = useGetProvider(chainId);
    
    return React.useCallback( async (blockNumber: number) => {
        return await provider.getBlockWithTransactions(blockNumber);
    }, [chainId, provider])
}