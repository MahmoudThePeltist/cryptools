import React from 'react';
import { ExportModalPresent } from './exportModal.present';
import { IApproval, ITokenData, ITransfer } from '../../../interfaces/token.intefaces';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../../hooks/stateHooks';

export const ExportModalContainer = ({ tokenData, open, exportVariant, setOpen }: any) => {

    const state = useHookstate(globalState);

    const csvGenElement = React.useRef<any>();
    const [csvData, setCsvData] = React.useState<any[]>([]);

    // Click the csv generation element after the csv data is generated
    React.useEffect(() => {
        if(csvData.length) csvGenElement.current.link.click();
    }, [csvData]);
    
    const generateCSVData = (uniqueColumnData: string = '', noContracts: boolean = false): any[][] => {
        let decimals: number = 10 ** Number(tokenData?.decimals);
        
        if(exportVariant == "Transfers") {
            let transfers: ITransfer[] = state.value.transfers.map(data => ({...data, value_num: +data.value/decimals}));
            transfers.sort((d1, d2) => (d2?.value_num && d1?.value_num) ? d2.value_num - d1.value_num : 0);
            
            if(uniqueColumnData) return fetchUniqueAttributeArrays(transfers, uniqueColumnData);
            return transfers.map(data => Object.values(data)); 
        }

        if(exportVariant == "Approvals") {
            let approvals: IApproval[] = state.value.approvals.map(data => ({...data, value_num: +data.value/decimals}));
            approvals.sort((d1, d2) => (d2?.value_num && d1?.value_num) ? d2.value_num - d1.value_num : 0);
            
            if(uniqueColumnData) return fetchUniqueAttributeArrays(approvals, uniqueColumnData);
            return approvals.map(data => Object.values(data));
        }

        return [];
    }

    const fetchUniqueAttributeArrays = (data: any[], attribute: string): string[][] => {
        let attributeArray: string[] = data.map(data => data[attribute]);
        return attributeArray.filter((data, index) => attributeArray.indexOf(data) == index)
                             .map(item => ([item]));
    } 

    return <ExportModalPresent
                open={open}
                setOpen={setOpen}
                csvData={csvData}
                csvGenElement={csvGenElement}
                setCsvData={setCsvData}
                generateCSVData={generateCSVData}
                stateData={state.value}
                exportVariant={exportVariant}/>
}