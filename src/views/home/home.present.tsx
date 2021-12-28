import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { DashboardCardPure } from './components/dashboardCard/dashboardCard.pure';
import { IDashboardCardProps } from "./components/dashboardCard/dashboardCard.interface";

export const HomePresent = ({cards}: {cards: IDashboardCardProps[]}) => {

    return (
        <Box sx={{padding: '20px'}}>            
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Typography variant='h2' sx={{paddingTop: 2, paddingBottom: 2}}>
                        Welcome to Moud's Cryptools
                    </Typography>
                </Grid>
                { cards.map((card: IDashboardCardProps) => (
                    <Grid sm={6} xs={12} padding={2}>
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
                        pretitle={'Cryptool'}
                        title={'More Coming Soon...'}
                        subtitle={'hold tight!'}
                        body={''}
                        link={''}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}