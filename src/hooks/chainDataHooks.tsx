import React from 'react';
import { useGetProvider } from './useGetProvider';

/**
 * Get the block number of the current active chain
 * @returns a callback that returns a promise which would fetch the block number 
 */
export const useGetBlockNumber = () => {
    const provider = useGetProvider();
    
    return React.useCallback(async () => await provider.getBlockNumber(), [provider])
}

/**
 * Get the transactions that are on a specific block, alongside other block data
 * @returns a callback that returns a promise to fetch the block data
 */
export const useBlockTransactions = () => {
    const provider = useGetProvider();
    
    return React.useCallback(async (block: number) => await provider.getBlockWithTransactions(block), [provider])
}