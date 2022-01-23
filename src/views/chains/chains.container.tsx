import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import {
    useBlockTransactions,
    useGetBlockNumber,
} from "../../hooks/chainDataHooks";
import { useSelectedChainId } from "../../hooks/useSelectedChainId";
import { ChainsPresent } from "./chains.present";
import { networks } from "../../utils/networkDefinitions.utils";

export const ChainsContainer = () => {
    const getBlockNumber = useGetBlockNumber();
    const getBlockTransactions = useBlockTransactions();
    const chainId = useSelectedChainId();

    const [blockNumber, setBlockNumber] = React.useState<number>();
    const [blockData, setBlockData] = React.useState<number>();
    const [txModalState, setTxModalState] = React.useState<boolean>(false);
    const [calcAvgBlocktime, setCalcAvgBlocktime] = React.useState<number>(networks[chainId]?.avg_blocktime);
    const [calcMiningDate, setCalcMiningDate] = React.useState<Date>(new Date());
    const [calcBlockNumber, setCalcBlockNumber] = React.useState<number>();
    
    React.useEffect(() => {
        let targetTime: number = calcMiningDate.getTime();
        let currentTime: number = new Date().getTime();
        let timeDifferenceInSecs: number = (targetTime - currentTime) / 1000;
        if(blockNumber) {
            const newBlockNumber: number = Math.round(blockNumber + (timeDifferenceInSecs / calcAvgBlocktime));
            setCalcBlockNumber(newBlockNumber);
        }
    }, [calcAvgBlocktime, calcMiningDate]);
    

    const dataTableColumns: GridColDef[] = [
        { field: 'hash', headerName: 'Hash', width: 250 },
        { field: 'confirmations', headerName: 'Confirmations', width: 140 },
        { field: 'gasPrice', headerName: 'Gas Price', width: 150 },
        { field: 'value', headerName: 'Value', width: 150 },
        { field: 'from', headerName: 'From', width: 250 },
        { field: 'to', headerName: 'To', width: 250 },
    ]
    const buildTableRows = (transactionData: any[]) => {
        const transactions = transactionData.map((transaction, index) => ({
            id: index,
            hash: transaction.hash,
            confirmations: transaction.confirmations,
            nonce: transaction.nonce,
            gasPrice: transaction.gasPrice.toString(),
            value: transaction.value.toString(),
            from: transaction.from,
            to: transaction.to,
        }))
        return transactions;
    }

    React.useEffect(() => {
        setBlockNumber(undefined);
        getBlockNumber()
            .then((response: any) => setBlockNumber(response));
    }, [chainId]);

    React.useEffect(() => {
        setBlockData(undefined);
        if(!blockNumber) return;
        getBlockTransactions(blockNumber)
            .then((response: any) => setBlockData(response))
    }, [blockNumber, chainId]);

    return <ChainsPresent
                chainId={chainId}
                network={networks[chainId]}
                blockNumber={blockNumber}
                blockData={blockData}
                txModalState={txModalState}
                setTxModalState={setTxModalState}
                dataTableColumns={dataTableColumns}
                buildTableRows={buildTableRows}
                calcAvgBlocktime={calcAvgBlocktime}
                calcMiningDate={calcMiningDate}
                calcBlockNumber={calcBlockNumber}
                setCalcAvgBlocktime={setCalcAvgBlocktime}
                setCalcMiningDate={setCalcMiningDate}
                setCalcBlockNumber={setCalcBlockNumber}/>;
};
