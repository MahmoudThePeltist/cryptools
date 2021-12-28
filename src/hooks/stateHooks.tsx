import React from 'react';
import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

export const globalState = createState({
    activeChainId: 1
});

globalState.attach(Persistence('plugin-persisted-data-key'));