import React from 'react';
import { Grid, Box, Typography, Card, TextField, Button, LinearProgress } from '@mui/material';

export const TokensPresent = ({address, setAddress, loading, addressValid, fetchTokenData, tokenData, error}: any) => {

    return (
        <Box sx={{padding: '20px'}}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Card sx={{padding: 2, margin: 2}}>
                        <Typography variant='h3'>Token Info</Typography>
                        <Typography variant='h4'>Fetch and display token data</Typography>
                    </Card>
                </Grid>
                <Grid xs={12}>
                    <Card sx={{padding: 3, margin: 2}}>
                        <Grid container>
                            <Grid xs={8}>
                                <TextField
                                    sx={{width: '100%'}} variant="outlined"
                                    label="Please enter token address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    helperText={(addressValid || !address?.length) ? '' : 'Address is not valid'}
                                    color="primary"
                                    focused />
                            </Grid>
                            <Grid xs={4}>
                                <Button
                                    sx={{height: '55px', width: '100%', marginLeft: 1 }}
                                    size="large"
                                    disabled={!addressValid || loading}
                                    onClick={() => fetchTokenData()}
                                    variant="contained">
                                        {addressValid ? 'Fetch Data' : 'Address Invalid'}
                                </Button>
                            </Grid>
                            <Grid xs={12}>
                                {loading ? <LinearProgress sx={{margin: 2}} color="primary" /> : ''}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                {error ? <Grid xs={12}>
                    <Card sx={{padding: 2, margin: 2}}>
                        <Grid container>
                            <Grid xs={12} sx={{padding: 2}}>
                                <Typography variant='subtitle1'>Something went wrong...</Typography>
                                <Typography variant='h6' sx={{color: 'red'}}>{ error }</Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid> : undefined}
                {tokenData ? <Grid xs={12}>
                    <Card sx={{padding: 2, margin: 2}}>
                        <Grid container>
                            <Grid xs={4} sx={{padding: 2}}>
                                <Typography variant='subtitle1'>Name</Typography>
                                <Typography variant='h6'>{ tokenData.name }</Typography>
                            </Grid>
                            <Grid xs={4} sx={{padding: 2}}>
                                <Typography variant='subtitle1'>Symbol</Typography>
                                <Typography variant='h6'>{ tokenData.symbol }</Typography>
                            </Grid>
                            <Grid xs={4} sx={{padding: 2}}>
                                <Typography variant='subtitle1'>Decimals</Typography>
                                <Typography variant='h6'>{ tokenData.decimals }</Typography>
                            </Grid>
                            <Grid xs={12} sx={{padding: 2}}>
                                <Typography variant='subtitle1'>Total Tokens</Typography>
                                <Typography variant='h6'>
                                    { `${tokenData.totalSupply.toString() / (10 ** +tokenData.decimals)}` }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid> : undefined}
            </Grid>
        </Box>
    )
}