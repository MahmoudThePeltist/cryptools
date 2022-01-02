import React from 'react';
import { Box, Modal, Typography, Grid, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from 'react-csv';

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

export const ExportModalPresent = ({
    open,
    setOpen,
    csvData,
    csvGenElement,
    setCsvData,
    generateCSVData,
    stateData,
    exportVariant
    }: any) => {
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

                        <Grid xs={12} sx={{padding: 1}}>                            
                            <Button
                                variant="contained" color="secondary"
                                sx={{marginRight: 1, marginBottom: 1}}
                                onClick={() => setCsvData(generateCSVData())}>
                                {exportVariant == "Transfers" ?
                                    (<><FileDownloadIcon/> All {stateData?.transfers?.length} Transfers</>) :
                                    (<><FileDownloadIcon/> All {stateData?.approvals?.length} Approvals</>)
                                }
                            </Button>
                            
                            <Button
                                variant="contained" color="secondary"
                                sx={{marginRight: 1, marginBottom: 1}}
                                onClick={() => setCsvData(generateCSVData((exportVariant == "Transfers" ? "from" : "owner")))}>
                                {exportVariant == "Transfers" ?
                                    (<><FileDownloadIcon/> Unique "From" Addresses</>) :
                                    (<><FileDownloadIcon/> Unique "Owner" Addresses</>)
                                }
                            </Button>
                            
                            <Button
                                variant="contained" color="secondary"
                                sx={{marginRight: 1, marginBottom: 1}}
                                onClick={() => setCsvData(generateCSVData((exportVariant == "Transfers" ? "to" : "spender")))}>
                                {exportVariant == "Transfers" ?
                                    (<><FileDownloadIcon/> Unique "To" Addresses</>) :
                                    (<><FileDownloadIcon/> Unique "Spender" Addresses</>)
                                }
                            </Button>
                            
                            <Button
                                variant="contained" color="secondary"
                                sx={{marginRight: 1, marginBottom: 1}}
                                onClick={() => setCsvData(generateCSVData((exportVariant == "Transfers" ? "from" : "owner"), true))}>
                                {exportVariant == "Transfers" ?
                                    (<><FileDownloadIcon/> Unique Non-Contract "From" Addresses</>) :
                                    (<><FileDownloadIcon/> Unique Non-Contract "Owner" Addresses</>)
                                }
                            </Button>
                            
                            <Button
                                variant="contained" color="secondary"
                                sx={{marginRight: 1, marginBottom: 1}}
                                onClick={() => setCsvData(generateCSVData((exportVariant == "Transfers" ? "to" : "spender"), true))}>
                                {exportVariant == "Transfers" ?
                                    (<><FileDownloadIcon/> Unique Non-Contract "To" Addresses</>) :
                                    (<><FileDownloadIcon/> Unique Non-Contract "Spender" Addresses</>)
                                }
                            </Button>
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