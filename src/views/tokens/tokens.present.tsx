import React from 'react';
import { Grid, Box, Typography, Card, TextField, Button, LinearProgress } from '@mui/material';
import { CSVLink } from "react-csv";
import { IDefaultToken } from '../../utils/networkDefinitions.utils';
import "./tokens.styles.scss";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HearingIcon from '@mui/icons-material/Hearing';
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled';

export const TokensPresent = ({
        address,
        setAddress,
        addressValid,
        tokenData,
        fetchTokenData,

        listenForTransfer,
        listenForApproval,
        stopListeningForEvent,
        activeEvents,
        stateData,
        networkData,    
        listenerCap,
        setListenerCap,

        openExportModal,
        loading,
        error,
    }: any) => {

    return (
        <Box sx={{padding: '20px'}}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Card sx={{padding: 2, margin: 2}}>
                        <Typography variant='h3'>Token Info</Typography>
                        <Typography variant='h4'>Fetch token data from {networkData.label}</Typography>
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
                                {networkData?.default_tokens?.map((data: IDefaultToken) => (
                                    <Button
                                        variant="contained" color="secondary"
                                        sx={{marginTop: 1, marginRight: 1}}
                                        onClick={() => setAddress(data.address)}>
                                            { data.name }
                                    </Button>
                                ))}
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
                            <Grid xs={12} sx={{padding: 1}}>
                                <Typography variant='h5'>General Details</Typography>
                            </Grid>
                            <Grid xs={3} sx={{padding: 1}}>
                                <Card sx={{padding: 1}}>
                                    <Typography variant='subtitle1'>Name</Typography>
                                    <Typography variant='h6'>{ tokenData.name }</Typography>
                                </Card>
                            </Grid>
                            <Grid xs={3} sx={{padding: 1}}>
                                <Card sx={{padding: 1}}>
                                    <Typography variant='subtitle1'>Symbol</Typography>
                                    <Typography variant='h6'>{ tokenData.symbol }</Typography>
                                </Card>
                            </Grid>
                            <Grid xs={3} sx={{padding: 1}}>
                                <Card sx={{padding: 1}}>
                                    <Typography variant='subtitle1'>Decimals</Typography>
                                    <Typography variant='h6'>{ tokenData.decimals }</Typography>
                                </Card>
                            </Grid>
                            <Grid xs={3} sx={{padding: 1}}>
                                <Card sx={{padding: 1}}>
                                    <Typography variant='subtitle1'>Total Tokens</Typography>
                                    <Typography variant='h6'>
                                        { `${tokenData.totalSupply.toString() / (10 ** +tokenData.decimals)}` }
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid xs={12} sx={{padding: 1, marginTop: 2}}>
                                <Typography variant='h5'>Listen To Events</Typography>
                                <Typography variant='h6'>
                                    Transactions capped to
                                    <TextField
                                        type="number"
                                        sx={{paddingLeft: 1, paddingRight: 1, maxWidth: 60}}
                                        variant="standard"
                                        value={listenerCap}
                                        onChange={(e) => setListenerCap(e.target.value)}/>
                                    to avoid leaks
                                </Typography>
                            </Grid>
                            <Grid xs={12} sx={{padding: 1}}>
                                <Button
                                    variant="contained"
                                    sx={{marginRight: 1}}
                                    onClick={() => (!activeEvents.includes("Transfer") ? listenForTransfer() : stopListeningForEvent("Transfer"))}>
                                        { !activeEvents.includes("Transfer") ? (<><HearingIcon/> Transfer</>) : (<><HearingDisabledIcon/> Transfer</>) }
                                </Button>
                                
                                <Button
                                    variant="contained" color="secondary"
                                    sx={{marginRight: 1}}
                                    onClick={() => openExportModal("Transfers")}>
                                    <FileDownloadIcon/> {stateData?.transfers?.length} Transfers
                                </Button>
                            </Grid>
                            <Grid xs={12} sx={{padding: 1}}>
                                <Button
                                    variant="contained"
                                    sx={{marginRight: 1}}
                                    onClick={() => (!activeEvents.includes("Approval") ? listenForApproval() : stopListeningForEvent("Approval"))}>
                                        { !activeEvents.includes("Approval") ? (<><HearingIcon/> Approval</>) : (<><HearingDisabledIcon/> Approval</>) }
                                </Button>
                                
                                <Button
                                    variant="contained" color="secondary"
                                    sx={{marginRight: 1}}
                                    onClick={() => openExportModal("Approvals")}>
                                    <FileDownloadIcon/> {stateData?.approvals?.length} Approvals
                                </Button>
                            </Grid>

                            
                        </Grid>
                    </Card>
                </Grid> : undefined}
            </Grid>
        </Box>
    )
}