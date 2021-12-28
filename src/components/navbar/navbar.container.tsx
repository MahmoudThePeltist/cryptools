import { useState } from '@hookstate/core';
import React from 'react';
import { globalState } from '../../hooks/stateHooks';
import { INavOption } from '../../interfaces/navigation.interfaces';
import { networksArray } from '../../utils/networkDefinitions.utils';
import { NavbarPresent } from './navbar.present';

export const NavbarContainer = () => {

    const pages: INavOption[] = [
        {link: '', label: 'Dashboard'},
        {link: 'chain', label: 'Chain Info'},
        {link: 'token', label: 'Token Info'},
        {link: '', label: 'Coming Soon...'}
    ];

    const chains = networksArray;

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const state = useState(globalState);
  
    const setActiveChain = (id: number) => {
      state.set({...state.value, activeChainId: id});
      setAnchorElUser(null);
    };

    return (
        <NavbarPresent
            pages={pages}
            chains={chains}
            anchorElNav={anchorElNav}
            anchorElUser={anchorElUser}
            handleOpenNavMenu={handleOpenNavMenu}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            activeChain={state.value.activeChainId}
            setActiveChain={setActiveChain}
            >
        </NavbarPresent>
    )
}