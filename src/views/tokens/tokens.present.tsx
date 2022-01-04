import React from 'react';
import { Grid, Box, Typography, Card, TextField, Button, LinearProgress } from '@mui/material';
import { IDefaultToken } from '../../utils/networkDefinitions.utils';
import "./tokens.styles.scss";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HearingIcon from '@mui/icons-material/Hearing';
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { IGlobalState, ITokenState } from '../../hooks/stateHooks';

interface ITokensPresentProps {
    address: string,
    setAddress: any,
    addressValid: boolean,
    tokenData: any,
    fetchTokenData: any,

    listenForTransfer: any,
    listenForApproval: any,
    listenForUniqueAddresses: any,
    resetAddresses: any,
    stopListeningForEvent: any,
    activeEvents: any,
    stateData: IGlobalState,
    tokenStateData: ITokenState,
    networkData: any,    
    listenerCap: any,
    setListenerCap: any,
    throttleCap: any,
    setThrottleCap: any,
    resetTransfers: any,
    resetApprovals: any,

    openExportModal: any,
    loading: boolean,
    error: any,
}

export const TokensPresent = ({
        address,
        setAddress,
        addressValid,
        tokenData,
        fetchTokenData,

        listenForTransfer,
        listenForApproval,
        listenForUniqueAddresses,
        resetAddresses,
        stopListeningForEvent,
        activeEvents,
        stateData,
        tokenStateData,
        networkData,    
        listenerCap,
        setListenerCap,
        throttleCap,
        setThrottleCap,
        resetTransfers,
        resetApprovals,

        openExportModal,
        loading,
        error,
    }: ITokensPresentProps) => {

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
                                <Typography variant='h4'>General Details</Typography>
                            </Grid>
                            <Grid xs={12} sm={6} md={3} sx={{padding: 1}}>
                                <Card sx={{padding: 1}}>
                                    <Typography variant='subtitle1'>Name</Typography>
                                    <Typography variant='h6'>{ tokenData.name }</Typography>
                                </Card>
                            </Grid>
                            <Grid xs={12} sm={6} md={3} sx={{padding: 1}}>
                                <Card sx={{padding: 1}}>
                                    <Typography variant='subtitle1'>Symbol</Typography>
                                    <Typography variant='h6'>{ tokenData.symbol }</Typography>
                                </Card>
                            </Grid>
                            <Grid xs={12} sm={6} md={3} sx={{padding: 1}}>
                                <Card sx={{padding: 1}}>
                                    <Typography variant='subtitle1'>Decimals</Typography>
                                    <Typography variant='h6'>{ tokenData.decimals }</Typography>
                                </Card>
                            </Grid>
                            <Grid xs={12} sm={6} md={3} sx={{padding: 1}}>
                                <Card sx={{padding: 1}}>
                                    <Typography variant='subtitle1'>Total Tokens</Typography>
                                    <Typography variant='h6'>
                                        { `${tokenData.totalSupply.toString() / (10 ** +tokenData.decimals)}` }
                                    </Typography>
                                </Card>
                            </Grid>

                            <Grid xs={12} sx={{padding: 1}}>
                                <Typography variant='h4' sx={{marginTop: 2}}>Listen To Events</Typography>
                                <Typography variant='h5'>Config</Typography>
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
                                <Typography variant='h6'>
                                    State writes throttled to
                                    <TextField
                                        type="number"
                                        sx={{paddingLeft: 1, paddingRight: 1, maxWidth: 60}}
                                        variant="standard"
                                        value={throttleCap}
                                        onChange={(e) => setThrottleCap(e.target.value)}/>
                                    to avoid leaks
                                </Typography>
                            </Grid>

                            <Grid xs={12} sx={{padding: 1}}>
                                <Typography variant='h5'>Events</Typography>
                                <Typography variant='h6'>Listen to events and export them</Typography>
                            </Grid>
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="contained"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => (!activeEvents.includes("Transfer") ? listenForTransfer() : stopListeningForEvent("Transfer"))}>
                                        { !activeEvents.includes("Transfer") ? (<><HearingIcon/> Transfer</>) : (<><HearingDisabledIcon/> Transfer</>) }
                                </Button>
                            </Grid>                                
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="contained" color="secondary"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => openExportModal("Transfers")}>
                                    <FileDownloadIcon/> {stateData?.transfers?.length} Transfers
                                </Button>
                            </Grid>                                
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="outlined" color="secondary"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => resetTransfers()}>
                                    <CleaningServicesIcon/> Clear
                                </Button>
                            </Grid>
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="contained"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => (!activeEvents.includes("Approval") ? listenForApproval() : stopListeningForEvent("Approval"))}>
                                        { !activeEvents.includes("Approval") ? (<><HearingIcon/> Approval</>) : (<><HearingDisabledIcon/> Approval</>) }
                                </Button>
                            </Grid>                                
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="contained" color="secondary"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => openExportModal("Approvals")}>
                                    <FileDownloadIcon/> {stateData?.approvals?.length} Approvals
                                </Button>
                            </Grid>                                
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="outlined" color="secondary"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => resetApprovals()}>
                                    <CleaningServicesIcon/> Clear
                                </Button>
                            </Grid>


                            <Grid xs={12} sx={{padding: 1}}>
                                <Typography variant='h5'>Automatic Processessing</Typography>
                                <Typography variant='h6'>Automatically process the events when fetching them</Typography>
                            </Grid>
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="contained"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => (!activeEvents.includes("UNIQUES") ? listenForUniqueAddresses() : stopListeningForEvent("UNIQUES"))}>
                                        { !activeEvents.includes("UNIQUES") ? (<><HearingIcon/> + Filter Addresses</>) : (<><HearingDisabledIcon/> + Filter Addresses</>) }
                                </Button>
                            </Grid>                                
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="contained" color="secondary"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => openExportModal("UNIQUES")}>
                                    <FileDownloadIcon/> {tokenStateData?.uniqueAddresses?.length} Unique Addresses
                                </Button>
                            </Grid>                                
                            <Grid xs={12} md={4} sx={{padding: 1}}>
                                <Button
                                    variant="outlined" color="secondary"
                                    sx={{marginRight: 1, width: '100%'}}
                                    onClick={() => resetAddresses()}>
                                    <CleaningServicesIcon/> Clear
                                </Button>
                            </Grid>

                            
                        </Grid>
                    </Card>
                </Grid> : undefined}
            </Grid>
        </Box>
    )
}