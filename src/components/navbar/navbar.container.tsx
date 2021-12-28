import React from 'react';
import { INavOption } from '../../interfaces/navigation.interfaces';
import { NavbarPresent } from './navbar.present';

export const NavbarContainer = () => {

    const pages: INavOption[] = [
        {link: '', label: 'Dashboard'},
        {link: 'chain', label: 'Chain Info'},
        {link: 'token', label: 'Token Info'},
        {link: '', label: 'Coming Soon...'}
    ];


    const settings = ['Select Chain', 'Connect', 'Disconnect'];
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

    return (
        <NavbarPresent
            pages={pages}
            settings={settings}
            anchorElNav={anchorElNav}
            anchorElUser={anchorElUser}
            handleOpenNavMenu={handleOpenNavMenu}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            >
        </NavbarPresent>
    )
}