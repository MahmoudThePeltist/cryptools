import React from 'react';
import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { IApproval, ITransfer } from '../interfaces/token.intefaces';

export interface IState {
    activeChainId: number,
    listenerCap: number,
    transfers: ITransfer[], 
    approvals: IApproval[], 
    activeEvents: string[],
}

export const defaultState: IState = {
    activeChainId: 1,
    listenerCap: 500,
    transfers: [],
    approvals: [],
    activeEvents: []
}

export const globalState = createState(defaultState);

globalState.attach(Persistence('plugin-persisted-data-key'));