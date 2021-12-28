import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import {
    useBlockTransactions,
    useGetBlockNumber,
    useSelectedChainId,
} from "../../hooks/chainDataHooks";
import { ChainsPresent } from "./chains.present";

export const ChainsContainer = () => {
    const getBlockNumber = useGetBlockNumber();
    const getBlockTransactions = useBlockTransactions();

    const [blockNumber, setBlockNumber] = React.useState<number>();
    const [blockData, setBlockData] = React.useState<number>();
    const [txModalState, setTxModalState] = React.useState<boolean>(false);

    const chainId = useSelectedChainId();

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
        console.log("transactions ", transactions);
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
                blockNumber={blockNumber}
                blockData={blockData}
                txModalState={txModalState}
                setTxModalState={setTxModalState}
                dataTableColumns={dataTableColumns}
                buildTableRows={buildTableRows}/>;
};
