import React from 'react';
import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { IApproval, ITransfer } from '../interfaces/token.intefaces';

export interface IGlobalState {
    activeChainId: number,
    listenerCap: number,
    throttleCap: number,
    transfers: ITransfer[], 
    approvals: IApproval[], 
    activeEvents: string[],
}
export interface ITokenState {
    testedAddresses: {address: string, status: boolean}[],
    uniqueAddresses: string[],
}

export const defaultState: IGlobalState = {
    activeChainId: 1,
    listenerCap: 500,
    throttleCap: 1,
    transfers: [],
    approvals: [],
    activeEvents: []
}

export const defaultTokenState: ITokenState = {
    testedAddresses: [],
    uniqueAddresses: [],
}

export const globalState = createState(defaultState);

export const tokenState = createState(defaultTokenState);

globalState.attach(Persistence('plugin-persisted-data-key'));