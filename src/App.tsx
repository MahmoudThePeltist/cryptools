import { Box, Container } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavbarContainer } from './components/navbar/navbar.container';
import { AddressesContainer } from './views/addresses/addresses.container';
import { ChainsContainer } from './views/chains/chains.container';
import { HomeContainer } from './views/home/home.container';
import { TokensContainer } from './views/tokens/tokens.container';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Container>
          <Box sx={{ padding: '20px' }}>
            <NavbarContainer></NavbarContainer>
            
            <Routes>
              <Route path="/" element={<HomeContainer/>}/>
              <Route path="/chain" element={<ChainsContainer/>}/>
              <Route path="/token" element={<TokensContainer/>}/>
              <Route path="/address" element={<AddressesContainer/>}/>
            </Routes> 
          </Box>
        </Container>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
