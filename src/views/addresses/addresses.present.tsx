import React from 'react';
import { Grid, Box, Typography, Card, TextField, Button, LinearProgress } from '@mui/material';
import { IDefaultToken, INetworkData } from '../../utils/networkDefinitions.utils';
import "./addresses.styles.scss";

interface IAddressesPresentProps {
    networkData: INetworkData | undefined,
    address: string,
    setAddress: any,
    addressValid: boolean,
    checkIfSmartContract: any,
    isContract: boolean | undefined,
    bytecode: string,
    loading: boolean,
    error: string
}

export const AddressesPresent = ({
    networkData,
    address,
    setAddress,
    addressValid,
    checkIfSmartContract,
    isContract,
    bytecode,
    loading,
    error
    }: IAddressesPresentProps) => {

    return (
        <Box sx={{padding: '20px'}}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Card sx={{padding: 2, margin: 2}}>
                        <Typography variant='h3'>📬 Address Info</Typography>
                        {networkData && <Typography variant='h4'>Fetch address data from {networkData.label}</Typography>}
                    </Card>
                </Grid>
                <Grid xs={12}>
                    <Card sx={{padding: 3, margin: 2}}>
                        <Grid container>
                            <Grid xs={12}>
                                <TextField
                                    sx={{width: '100%'}} variant="outlined"
                                    label="Please enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    helperText={(addressValid || !address?.length) ? '' : 'Address is not valid'}
                                    color="primary"
                                    focused />
                            </Grid>
                            <Grid xs={12}>
                                <Button
                                    sx={{ marginTop: 1, marginRight: 1 }}
                                    size="large"
                                    disabled={!addressValid || loading}
                                    onClick={() => checkIfSmartContract()}
                                    variant="contained">
                                        Check if Smart Contract {!addressValid && ' (Enter valid address)'}
                                </Button>
                            </Grid>
                            <Grid xs={12} md={6} sx={{marginTop: 2, padding: 1}}>
                                <Card sx={{padding: 1}}>                                    
                                    <Typography variant="subtitle2"> 🔹 Is address a Smart Contract? </Typography>
                                    {isContract == undefined && <Typography variant="h6"> Click "Check if Smart Contract" to check </Typography>}
                                    {isContract == true && <Typography variant="h6"> Definitely a smart contract </Typography>}
                                    {isContract == false && <Typography variant="h6"> Probably not a smart contract </Typography>}
                                </Card>
                            </Grid>
                            <Grid xs={12} md={6} sx={{marginTop: 2, padding: 1}}>
                                {isContract && <Card sx={{padding: 1}}>                                    
                                    <Typography variant="subtitle2"> 🔹 Bytecode length </Typography>
                                    <Typography variant="h6"> { bytecode.length } </Typography>
                                </Card>}
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
            </Grid>
        </Box>
    )
}