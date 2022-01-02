import { Contract } from "ethers";

export interface ITokenData {
    name: string,
    symbol: string,
    decimals: string,
    totalSupply: string
}

export interface ITransfer {
    from: string,
    to: string,
    value: string,
    value_num?: number
}

export interface IApproval {
    owner: string,
    spender: string,
    value: string,
    value_num?: number
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