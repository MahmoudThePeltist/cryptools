import React from 'react';
import { IDashboardCardProps } from './components/dashboardCard/dashboardCard.interface';
import { HomePresent } from "./home.present";
import LinkIcon from '@mui/icons-material/Link';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export const HomeContainer = () => {

    // Cards defined for the homescreen
    const cards: IDashboardCardProps[] = [{
            pretitle: <><LinkIcon/></>,
            title: <>Blockchains</>,
            subtitle: <>Chain Info</>,
            body: "Fetch the latest block data about the currently selected blockchain. Also fetch and list the block's transactions.",
            link: 'chain'
        }, {
            pretitle: <><MonetizationOnIcon/></>,
            title: <>Tokens</>,
            subtitle: <>ERC20/BEP20</>,
            body: 'Data about a specific ERC20 standard token on the selected blockchain, event analysis and unique address fetching and exporting.',
            link: 'token'
        }, {
            pretitle: <><AlternateEmailIcon/></>,
            title: <>Addresses</>,
            subtitle: <>Wallets and Smart Contracts</>,
            body: 'General purpose interactions with addresses directly.',
            link: 'address'
        },
    ]

    return (
        <HomePresent cards={cards}/>
    )
}