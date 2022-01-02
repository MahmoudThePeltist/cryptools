import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Grid,
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { INavOption } from "../../interfaces/navigation.interfaces";

export const NavbarPresent = ({
  pages,
  chains,
  anchorElNav,
  anchorElUser,
  handleOpenNavMenu,
  handleOpenUserMenu,
  handleCloseNavMenu,
  handleCloseUserMenu,
  activeChain,
  setActiveChain
}: any) => {
  return (
    <AppBar className="moudRoundedElement" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            M⚙ud's Cryptools
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page: INavOption) => (
                <Link style={{textDecoration: 'none'}} to={page.link} key={page.label} onClick={handleCloseNavMenu}>
                  <MenuItem>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            M⚙ud's Cryptools
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: INavOption) => (
              <Link
                style={{textDecoration: 'none'}}
                to={page.link}
                key={page.label}
                onClick={handleCloseNavMenu}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open chains list">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Button variant="contained">
                  {chains.filter((c: any) => c.id == activeChain)[0].label}
                </Button>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {chains.map((chain: {id: number, label: string}) => (
                <MenuItem key={chain.id} onClick={() => setActiveChain(chain.id)}>
                  <Typography textAlign="center">{ chain.id } - {chain.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
