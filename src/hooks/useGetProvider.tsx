import React from 'react';
import { ethers } from 'ethers';

export const networks: {[index: number]: {label: string, scan: string}} = {
    57: {label: 'BSC Mainnet', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'}, // BSCScan
    1: {label: 'ETH Mainnet', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'}, // Etherscan
}

export const useGetProvider = (chainId: number) => {
    if(!networks[chainId]) throw("Moud's Cryptools: Chain not supported.")

    return React.useMemo(() => {
        return ethers.getDefaultProvider(chainId, {
            etherscan: networks[chainId].scan
        });
    }, [chainId]);
}