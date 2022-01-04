import React from 'react';
import { Box, Modal, Typography, Grid, Button, LinearProgress } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { CSVLink } from 'react-csv';
import { IGlobalState, ITokenState } from '../../../hooks/stateHooks';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

interface IExportModalPresentProps {
    open: boolean,
    setOpen: any,
    csvData: any,
    csvGenElement: any,
    generateCSVData: any,
    checkForSmartContracts: any,
    stateData: IGlobalState,
    tokenStateData: ITokenState,
    exportVariant: string,
    loading: boolean,
    buttonACount: number,
    buttonBCount: number
}

export const ExportModalPresent = ({
    open,
    setOpen,
    csvData,
    csvGenElement,
    generateCSVData,
    stateData,
    checkForSmartContracts,
    tokenStateData,
    exportVariant,
    loading,
    buttonACount,
    buttonBCount
    }: IExportModalPresentProps) => {
    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>

                    <Grid container>
                        <Grid xs={12} sx={{padding: 1}}>
                            <Typography variant="h4">
                                Export Data or Addresses for { exportVariant }
                            </Typography>
                            <Typography variant="h5">
                                Select the format of the CSV data to export
                            </Typography>
                        </Grid>


                        {(exportVariant == "UNIQUES") && <>
                        <Grid xs={12} sx={{padding: 1}}>
                            <Button
                                variant="contained" color="success"
                                sx={{marginRight: 1, marginBottom: 1, width: '100%'}}
                                onClick={() => generateCSVData('', 'all')}>
                                <FileDownloadIcon/> All {tokenStateData?.uniqueAddresses?.length} Addresses
                            </Button>
                        </Grid>
                        <Grid xs={12} sx={{padding: 1}}>
                            <Button
                                variant="contained" color="info"
                                sx={{marginRight: 1, marginBottom: 1, width: '100%'}}
                                onClick={() => checkForSmartContracts()}>
                                <SmartToyIcon sx={{marginRight: 1}}/>
                                Check for Smart Contracts ({ tokenStateData?.testedAddresses.length } / {tokenStateData?.uniqueAddresses?.length})
                            </Button>
                        </Grid>
                        <Grid xs={6} sx={{padding: 1}}>
                            <Button
                                variant="contained" color="success"
                                sx={{marginRight: 1, marginBottom: 1, width: '100%'}}
                                onClick={() => generateCSVData('', 'contracts')}>
                                <FileDownloadIcon/> Smart Contracts ({
                                    tokenStateData?.testedAddresses.filter(data => data.status == false).length + ' / ' + tokenStateData?.testedAddresses.length
                                })
                            </Button>
                        </Grid>
                        <Grid xs={6} sx={{padding: 1}}>
                            <Button
                                variant="contained" color="success"
                                sx={{marginRight: 1, marginBottom: 1, width: '100%'}}
                                onClick={() => generateCSVData('', 'humans')}>
                                <FileDownloadIcon/> Not Smart Contracts ({
                                    tokenStateData?.testedAddresses.filter(data => data.status == true).length + ' / ' + tokenStateData?.testedAddresses.length
                                })
                            </Button>
                        </Grid>
                        <Grid xs={12} sx={{textAlign: 'center'}}>
                            <Typography variant="subtitle1">
                                Non-contract analysis may take a few minutes, make sure listener is off
                            </Typography>
                        </Grid>
                        </>}

                        {!(exportVariant == "UNIQUES") && <>
                        <Grid xs={12} sx={{padding: 1}}>
                            <Button
                                variant="contained" color="success"
                                sx={{marginRight: 1, marginBottom: 1, width: '100%'}}
                                onClick={() => generateCSVData()}>
                                {(exportVariant == "Transfers") &&
                                    (<><FileDownloadIcon/> All {stateData?.transfers?.length} Transfers</>)}
                                {(exportVariant == "Approvals") &&
                                    (<><FileDownloadIcon/> All {stateData?.approvals?.length} Approvals</>)}
                            </Button>
                        </Grid>

                        <Grid xs={6} sx={{padding: 1}}>                             
                            <Button
                                variant="contained" color="secondary"
                                sx={{marginRight: 1, marginBottom: 1, width: '100%'}}
                                onClick={() => generateCSVData((exportVariant == "Transfers" ? "from" : "owner"))}>
                                {exportVariant == "Transfers" ?
                                    (<><FileDownloadIcon/> {buttonACount} unique "From" Addresses</>) :
                                    (<><FileDownloadIcon/> {buttonACount} unique "Owner" Addresses</>)
                                }
                            </Button>
                        </Grid>

                        <Grid xs={6} sx={{padding: 1}}>                            
                            <Button
                                variant="contained" color="secondary"
                                sx={{marginRight: 1, marginBottom: 1, width: '100%'}}
                                onClick={() => generateCSVData((exportVariant == "Transfers" ? "to" : "spender"))}>
                                {exportVariant == "Transfers" ?
                                    (<><FileDownloadIcon/> {buttonBCount} unique "To" Addresses</>) :
                                    (<><FileDownloadIcon/> {buttonBCount} unique "Spender" Addresses</>)
                                }
                            </Button>
                        </Grid>
                        </>}

                        <Grid xs={12} sx={{padding: 1}}>
                            {loading ? <LinearProgress sx={{margin: 2}} color="primary" /> : ''}
                        </Grid>
                    </Grid>

                    <CSVLink
                        style={{visibility: 'hidden'}}
                        ref={csvGenElement}
                        filename={`MCT_${exportVariant}_${new Date().getTime()}.csv`}
                        data={csvData}>
                            Export CSV (this button should be hidden)
                    </CSVLink>
                </Box>
            </Modal>
        </>
    );
}