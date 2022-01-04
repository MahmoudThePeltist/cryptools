import React from 'react';
import { ExportModalPresent } from './exportModal.present';
import { IApproval, ITransfer } from '../../../interfaces/token.intefaces';
import { useHookstate } from '@hookstate/core';
import { globalState, tokenState } from '../../../hooks/stateHooks';
import { useCheckManyIfContract } from '../../../hooks/tokenHooks';

interface IExportModalContainerProps {
    tokenData: any,
    open: boolean,
    exportVariant: any,
    setOpen: any
}

export const ExportModalContainer = ({
    tokenData,
    open,
    exportVariant,
    setOpen
    }: IExportModalContainerProps) => {    

    const state = useHookstate(globalState);
    const tState = useHookstate(tokenState);

    const checkManyIfContract = useCheckManyIfContract();

    const csvGenElement = React.useRef<any>();
    const [csvData, setCsvData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [buttonACount, setButtonACount] = React.useState<number>(0);
    const [buttonBCount, setButtonBCount] = React.useState<number>(0);

    // Set button counts
    React.useEffect(() => {
        if(exportVariant == "Transfers") {
            setButtonACount(
                fetchUniqueAttributeArrays(state.value.transfers, 'from', false).length
            );
            setButtonBCount(
                fetchUniqueAttributeArrays(state.value.transfers, 'to', false).length
            );
        }
        else if(exportVariant == "Approvals") {
            setButtonACount(
                fetchUniqueAttributeArrays(state.value.approvals, 'owner', false).length
            );
            setButtonBCount(
                fetchUniqueAttributeArrays(state.value.approvals, 'spender', false).length
            );
        }
    }, [state.value.transfers, state.value.approvals]);

    // Click the csv generation element after the csv data is generated
    React.useEffect(() => {
        if(csvData.length) csvGenElement.current.link.click();
    }, [csvData]);

    const generateCSVData = (uniqueColumnData: string = '', fetchType: string = 'all'): void => {
        if(exportVariant == "Transfers")
            csvFactory(state.value.transfers, uniqueColumnData, true);
        else if(exportVariant == "Approvals")
            csvFactory(state.value.approvals, uniqueColumnData, true);
        else if(exportVariant == "UNIQUES") {
            if(fetchType == 'humans')
                csvFactory(tState.value.testedAddresses.filter(data => data.status == true), 'address', false);
            else if(fetchType == 'contracts')
                csvFactory(tState.value.testedAddresses.filter(data => data.status == false), 'address', false);
            else
                csvFactory(tState.value.testedAddresses, 'address', false);
        }
    }

    const checkForSmartContracts = (uniqueColumnData: string = 'address') => {      
        setLoading(true);
        const formattedData = tState.value.uniqueAddresses.map(data => ({address: data}));
        const uniqueAddressses: any[] = fetchUniqueAttributeArrays(formattedData, uniqueColumnData, false);
        
        checkManyIfContract(uniqueAddressses, (address: string, status: boolean) => {
            let payload = {address, status};
            console.log("is human? ", payload);
            tokenState.set(data => ({...data, testedAddresses: [...data.testedAddresses, payload]}));
        }).finally(() => setLoading(false))
    }

    const csvFactory = (data: any[], uniqueColumnData: string = '', valueAndSort: boolean) => {
        if(valueAndSort) {
            let decimals: number = 10 ** Number(tokenData?.decimals);
            data = data.map(data => ( data.value ? {...data, value_num: +data.value/decimals} : data));
            data.sort((d1, d2) => (d2?.value_num && d1?.value_num) ? d2.value_num - d1.value_num : 0);
        }
            
        if(uniqueColumnData)
            setCsvData(fetchUniqueAttributeArrays(data, uniqueColumnData));
        else
            setCsvData(data.map(d => Object.values(d)));
    }

    /**
     * 
     * @param data 
     * @param attribute 
     * @param arrayOfArrays 
     * @returns 
     */
    const fetchUniqueAttributeArrays = (data: any[], attribute: string, arrayOfArrays: boolean = true): (string | string[])[] => {
        let attributeArray: string[] = data.map(data => data[attribute]);
        return attributeArray.filter(
            (data, index) => attributeArray.indexOf(data) == index).map(item => (arrayOfArrays ? [item] : item)
        );
    }

    return <ExportModalPresent
                open={open}
                setOpen={setOpen}
                csvData={csvData}
                csvGenElement={csvGenElement}
                generateCSVData={generateCSVData}
                checkForSmartContracts={checkForSmartContracts}
                stateData={state.value}
                tokenStateData={tState.value}
                exportVariant={exportVariant}
                loading={loading}
                buttonACount={buttonACount}
                buttonBCount={buttonBCount}/>
}