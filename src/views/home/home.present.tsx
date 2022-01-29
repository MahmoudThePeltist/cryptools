import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { DashboardCardPure } from './components/dashboardCard/dashboardCard.pure';
import { IDashboardCardProps } from "./components/dashboardCard/dashboardCard.interface";

export const HomePresent = ({cards}: {cards: IDashboardCardProps[]}) => {

    return (
        <Box sx={{padding: '20px'}}>            
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Typography variant='h2' sx={{paddingTop: 2}}>
                        Dev Cryptools
                    </Typography>
                    <Typography variant='h6' sx={{paddingBottom: 2}}>
                        Tools to help out web3 developers and testers
                    </Typography>
                </Grid>
                { cards.map((card: IDashboardCardProps) => (
                    <Grid sm={4} xs={12} padding={2}>
                        <DashboardCardPure
                            pretitle={card.pretitle}
                            title={card.title}
                            subtitle={card.subtitle}
                            body={card.body}
                            link={card.link}
                        />
                    </Grid>
                ))}
                <Grid xs={12} padding={2}>
                    <DashboardCardPure
                        pretitle={<>Cryptool</>}
                        title={<>More tools coming soon...</>}
                        subtitle={<>Developed by <a href="https://github.com/MahmoudThePeltist/cryptools">Moud</a> for practice</>}
                        body={''}
                        link={''}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}