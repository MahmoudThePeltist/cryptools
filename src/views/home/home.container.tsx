import { useState } from '@hookstate/core';
import React from 'react';
import { globalState } from '../../hooks/stateHooks';
import { IDashboardCardProps } from './components/dashboardCard/dashboardCard.interface';
import { HomePresent } from "./home.present"

export const HomeContainer = () => {

    // Cards defined for the homescreen
    const cards: IDashboardCardProps[] = [
        {pretitle: 'Cryptool',title: 'Blockchains',subtitle: 'Chain Info',body: 'Data about specific blokchains.',link: 'chain'},
        {pretitle: 'Cryptool',title: 'Tokens',subtitle: 'ERC20/BEP20',body: 'Data about a specific ERC20 standard token.',link: 'token'},
    ]

    const state = useState(globalState);

    return (
        <HomePresent cards={cards}/>
    )
}