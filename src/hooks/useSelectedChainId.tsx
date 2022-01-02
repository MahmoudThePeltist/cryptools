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