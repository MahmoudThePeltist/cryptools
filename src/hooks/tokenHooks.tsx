import React from 'react';
import { Contract, ethers, providers } from 'ethers';
import ERC20ABI from '../ABIs/erc20.json';
import { useGetProvider } from './useGetProvider';
import { IERC20Contract, ITokenData } from '../interfaces/token.intefaces';

export const AddressZero = "0x0000000000000000000000000000000000000000";

/**
 * Fetch the Contract object for a specific smart contract
 * @param address contract address
 * @param ABI contract ABI
 * @param withSigner signer or provider if it exists
 */
export function getContract(address: string, ABI: any, providerOrSigner: any = undefined): Contract {
    if (!ethers.utils.isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
  
    return new Contract(address, ABI, providerOrSigner);
}

export const useContract = (address: string, ABI: any, withSigner: any = undefined): Contract => {
    return React.useMemo(() => getContract(address, ABI, withSigner), [address, ABI, withSigner]);
}

/**
 * Retruns a callback to fetch the Contract object for a ERC20 standard token smart contract
 * @param address contract address
 * @param withSigner signer or provider if it exists
 */
export const useGetTokenContract = () => {
    return React.useCallback((address: string, withSigner: any = undefined): IERC20Contract => {
        return new ethers.Contract(address, ERC20ABI, withSigner) as IERC20Contract;
    }, [])
}

/**
 * Returns an async callback to fetch the standard ERC20 token info
 * @returns callback
 */
export const useGetTokenData = () => {
    const provider = useGetProvider();

    return React.useCallback(async (address: string): Promise<ITokenData> => {
        const contract = getContract(address, ERC20ABI, provider);
        const connectedContract = await contract.connect(address);
        
        try {
            const name = await connectedContract.name();
            const symbol = await connectedContract.functions.symbol();
            const decimals = await connectedContract.decimals();
            const totalSupply = await connectedContract.totalSupply();

            return {name, symbol, decimals, totalSupply};
        } catch(e) { throw(e) }
    }, [provider]);
}

export const useSubscribeEvent = () => {
    const provider = useGetProvider();

    return React.useCallback(async (event: string, address: string, callback: any): Promise<any> => {
        const contract = getContract(address, ERC20ABI, provider);
        const connectedContract = await contract.connect(address);
        
        try {
            connectedContract.on(event, callback);
        } catch(e) { throw(e) }
    }, [provider]);
}

export const useUnsubscribeListener = () => {
    const provider = useGetProvider();

    return React.useCallback(async (event: string, listener: any, address: string): Promise<any> => {
        const contract = getContract(address, ERC20ABI, provider);
        const connectedContract = await contract.connect(address);
        
        try {
            let result = await connectedContract.off(event, listener);
            console.log("unsubscribe result: ", result);
        } catch(e) { throw(e) }
    }, [provider]);
}

export const useUnsubscribeAllListeners = () => {
    const provider = useGetProvider();

    return React.useCallback(async (event: string, address: string): Promise<any> => {
        const contract = getContract(address, ERC20ABI, provider);
        const connectedContract = await contract.connect(address);
        
        try {
            let listeners = await connectedContract.listeners(event);
            console.log("listeners ", listeners);
            let result = await connectedContract.removeAllListeners(event);
            console.log("unsubscribe result: ", result);
        } catch(e) { throw(e) }
    }, [provider]);
}


export const useQueryTransfers = () => {
    const provider = useGetProvider();

    return React.useCallback(async (address: string): Promise<any> => {
        console.log("filter ", address);
        if(!address) throw("Address required");

        const contract = getContract(address, ERC20ABI, provider);
        const connectedContract = await contract.connect(address);
        const filter = connectedContract.filters.Transfer();
        try {
            console.log("Requesting in query filter...", filter);
            const result = await connectedContract.queryFilter(filter);
            console.log("Query filter result: ", result);
            return result;
        } catch(e) { throw(e) }
    }, [provider]);
}

export const useQueryApprovals = () => {
    const provider = useGetProvider();

    return React.useCallback(async (address: string): Promise<any> => {
        console.log("filter ", address);
        if(!address) throw("Address required");

        const contract = getContract(address, ERC20ABI, provider);
        const connectedContract = await contract.connect(address);
        const filter = connectedContract.filters.Transfer();
        try {
            console.log("Requesting in query filter...", filter);
            const result = await connectedContract.queryFilter(filter, 13800000, 13903000);
            console.log("Query filter result: ", result);
            return result;
        } catch(e) { throw(e) }
    }, [provider]);
}