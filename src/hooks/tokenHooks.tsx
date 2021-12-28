import React from 'react';
import { Contract, ethers } from 'ethers';
import ERC20ABI from '../ABIs/erc20.json';
import { useGetProvider } from './useGetProvider';
import { useSelectedChainId } from './chainDataHooks';

export interface ITokenData {
    name: string,
    symbol: string,
    decimals: string,
    totalSupply: string
}

export interface IERC20Contract extends Contract {
    name: any,
    symbol: any,
    decimals: any,
    totalSupply: any,
    balanceOf: any,
    approve: any,
    Approval: any,
    Transfer: any,
    transferFrom: any,
    transfer: any,
    allowance: any,
    owner: any,
}

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
    return getContract(address, ABI, withSigner);
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
    const chainId = useSelectedChainId();
    const provider = useGetProvider(chainId);

    return React.useCallback(async (address: string): Promise<ITokenData> => {
        const contract = getContract(address, ERC20ABI, provider);
        const connectedContract = await contract.connect(address);
        
        try {
            const name = await connectedContract.name();
            const symbol = await connectedContract.functions.symbol();
            const decimals = await connectedContract.decimals();
            const totalSupply = await connectedContract.totalSupply();

            return {name, symbol, decimals, totalSupply};
        } catch(e) {
            throw(e);
        }
    }, [provider, ERC20ABI]);
}