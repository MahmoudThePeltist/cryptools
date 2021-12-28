import React from 'react';
import { ethers } from 'ethers';
import { useGetProvider } from './useGetProvider';
import { useState } from '@hookstate/core';
import { globalState } from './stateHooks';

/**
 * fetch the active chain from the state
 * @returns The current active blockchain ID
 */
export const useSelectedChainId = () => {
    const state = useState(globalState);
    return state.value.activeChainId;
};

/**
 * Get the block number of the current active chain
 * @returns a callback that returns a promise which would fetch the block number 
 */
export const useGetBlockNumber = () => {
    const chainId = useSelectedChainId();
    const provider = useGetProvider(chainId);
    
    return React.useCallback( async () => {
        return await provider.getBlockNumber();
    }, [chainId, provider])
}

/**
 * Get the transactions that are on a specific block, alongside other block data
 * @returns a callback that returns a promise to fetch the block data
 */
export const useBlockTransactions = () => {
    const chainId = useSelectedChainId();
    const provider = useGetProvider(chainId);
    
    return React.useCallback( async (blockNumber: number) => {
        return await provider.getBlockWithTransactions(blockNumber);
    }, [chainId, provider])
}