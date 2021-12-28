import React from 'react';
import { IDashboardCardProps } from './components/dashboardCard/dashboardCard.interface';
import { HomePresent } from "./home.present"

export const HomeContainer = () => {

    const cards: IDashboardCardProps[] = [
        {pretitle: 'Cryptool',title: 'Blockchains',subtitle: 'Chain Info',body: 'Data about specific blokchains.',link: 'chain'},
        {pretitle: 'Cryptool',title: 'Tokens',subtitle: 'ERC20/BEP20',body: 'Data about a specific ERC20 standard token.',link: 'token'},
    ] 

    return (
        <HomePresent cards={cards}></HomePresent>
    )
}