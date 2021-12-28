import React from "react";
import { Grid, Box, Typography, Modal, Button, Card, LinearProgress } from "@mui/material";
import './chains.styles.scss';
import { DataGrid } from "@mui/x-data-grid";
import { networks } from "../../utils/networkDefinitions.utils";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export const ChainsPresent = ({ chainId, blockNumber, blockData, txModalState, setTxModalState, dataTableColumns, buildTableRows }: any) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid sm={12} xs={12}>
          <Card sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h3">🔗 Chain Info</Typography>
            <Typography variant="h4">{networks[chainId]?.label ?? 'Chain Name...'}</Typography>
          </Card>
        </Grid>
        <Grid sm={6} xs={12}>
          <Card sx={{ padding: 2, margin: 2 }}>
            <Typography variant="subtitle1">💠 Blockhain Id</Typography>
            <Typography variant="h5">{chainId ?? <LinearProgress sx={{margin: 2}} color="primary" />}</Typography>
          </Card>
        </Grid>
        <Grid sm={6} xs={12}>
          <Card sx={{ padding: 2, margin: 2 }}>
            <Typography variant="subtitle1">💠 Latest Block Number</Typography>
            <Typography variant="h5">{blockNumber ?? <LinearProgress sx={{margin: 2}} color="primary" />}</Typography>
          </Card>
        </Grid>
        <Grid sm={6} xs={12}>
          <Card sx={{ padding: 2, margin: 2 }}>
            <Typography variant="subtitle1">💠 Miner Address</Typography>
            <Typography variant="h6">{blockData?.miner ?? <LinearProgress sx={{margin: 2}} color="primary" />}</Typography>
          </Card>
        </Grid>
        <Grid sm={6} xs={12}>
          <Card sx={{ padding: 2, margin: 2 }}>
            <Typography variant="subtitle1">💠 Current Block Time</Typography>
            <Typography variant="h5">{blockData?.timestamp ? new Date(blockData.timestamp * 1000).toDateString() : <LinearProgress sx={{margin: 2}} color="primary" />}</Typography>
          </Card>
        </Grid>
        <Grid sm={6} xs={12}>
          <Card sx={{ padding: 2, margin: 2 }}>
            <Typography variant="subtitle1">💠 Block Difficulty</Typography>
            <Typography variant="h6">{blockData?._difficulty ? blockData._difficulty.toString() : <LinearProgress sx={{margin: 2}} color="primary" />}</Typography>
          </Card>
        </Grid>
        <Grid sm={6} xs={12}>
          <Card sx={{ padding: 2, margin: 2 }}>
            <Typography variant="subtitle1">💠 Transactions</Typography>
                {blockData?.transactions ? (
                  <Button variant="contained" onClick={() => setTxModalState(true)}>
                    {blockData.transactions.length} transactions, Click to view
                  </Button>)  : <LinearProgress sx={{margin: 2}} color="primary" />}
          </Card>
        </Grid>
      </Grid>

        <Modal open={txModalState} onClose={() => setTxModalState(false)}>
            {blockData?.transactions ?
                (<Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        {buildTableRows(blockData?.transactions).length} Transactions 
                    </Typography>
                    <Typography variant="subtitle1">💠 
                        Click Column Header to sort
                    </Typography>
                        
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid rows={buildTableRows(blockData?.transactions)} columns={dataTableColumns} />
                    </div>
                </Box>) : (
                    <Typography variant="h6" component="h2">
                        Transaction List Is Loading...
                    </Typography>
                )}
        </Modal>
    </Box>
  );
};
