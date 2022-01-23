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
            body: "Fetch the latest block data and transactions for the selected blockchain. Predicts which blocks will be mined on which date.",
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
            body: 'General purpose interactions with addresses directly. Check if an address is a smart contract.',
            link: 'address'
        },
    ]

    return (
        <HomePresent cards={cards}/>
    )
}