import React from "react";
import { Grid, Box, Typography, Modal, Button, Card, LinearProgress, TextField } from "@mui/material";
import './chains.styles.scss';
import { DataGrid } from "@mui/x-data-grid";
import { DateTimePicker } from "@mui/lab";

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

export const ChainsPresent = ({
  chainId,
  network,
  blockNumber,
  blockData,
  txModalState,
  setTxModalState,
  dataTableColumns,
  buildTableRows,
  calcAvgBlocktime,
  calcMiningDate,
  calcBlockNumber,
  setCalcAvgBlocktime,
  setCalcMiningDate,
  setCalcBlockNumber }: any) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid sm={12} xs={12}>
          <Card sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h3">🔗 Chain Info</Typography>
            <Typography variant="h4">{network?.label ?? 'Chain Name...'}</Typography>
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
        
        <Grid sm={12} xs={12}>
          <Card sx={{ padding: 2, margin: 2, marginBottom: 0 }}>
            <Typography variant="h5">💠 Predict Block Number </Typography>
            <Typography variant="subtitle2">Predict block number to be mined at specific date and time, assuming a specific average blocktime</Typography>
            <Grid container>
              
              <Grid sm={4} xs={12} sx={{ padding: 2 }}>
                <Typography variant="subtitle1">⌚ Average blocktime in seconds</Typography>
                <TextField
                  type="number"
                  placeholder="Average blocktime in seconds"
                  variant="standard"
                  value={calcAvgBlocktime}
                  onChange={(e: any) => setCalcAvgBlocktime(e.target.value)}/>
              </Grid>
              <Grid sm={4} xs={12} sx={{ padding: 2 }}>
                <Typography variant="subtitle1">📅 Mining date</Typography>
                <DateTimePicker
                  renderInput={(props: any) => <TextField variant="standard" {...props} />}
                  value={calcMiningDate}
                  onChange={(value: any) => setCalcMiningDate(value)}>
                </DateTimePicker>
              </Grid>
              <Grid sm={4} xs={12} sx={{ padding: 2 }}>
                <Typography variant="subtitle1">🔢 Block Number</Typography>
                <TextField
                  type="number"
                  placeholder="Target Block Number"
                  variant="standard"
                  value={calcBlockNumber}
                  onChange={(e: any) => setCalcBlockNumber(e.target.value)}/>
              </Grid>
              <Typography variant="subtitle2">
                Accurate average block time can be found at this chain's block explorer
                {network.scanner_site ? <a href={network.scanner_site+'/chart/blocktime'}> 
                    - go to explorer -
                  </a> : undefined}
              </Typography>
            </Grid>
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
