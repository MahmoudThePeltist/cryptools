
import React from 'react';
import { ethers } from 'ethers';
import { useHookstate } from '@hookstate/core';
import { globalState, tokenState } from '../../hooks/stateHooks';
import {
    useGetTokenData,
    useSubscribeEvent,
    useUnsubscribeAllListeners,
    useUnsubscribeListener} from '../../hooks/tokenHooks';
import { useChainData } from '../../hooks/useGetProvider';
import { IApproval, ITokenData, ITransfer } from '../../interfaces/token.intefaces';
import { ExportModalContainer } from './exportModal/exportModal.container';
import { TokensPresent } from "./tokens.present"

export const TokensContainer = () => {

    const state = useHookstate(globalState);
    const tState = useHookstate(tokenState);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');
    const [addressValid, setAddressValid] = React.useState<boolean>(false);
    const [tokenData, setTokenData] = React.useState<ITokenData>();
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [exportVariant, setExportVariant] = React.useState<string>();

    const networkData = useChainData();
    const getTokenData = useGetTokenData();
    const subscribeToEvent = useSubscribeEvent();
    const unsubscribe = useUnsubscribeListener();
    const unsubscribeAll = useUnsubscribeAllListeners();

    const resetTransfers = () => state.set(data => ({...data, transfers: []}));
    const resetApprovals = () => state.set(data => ({...data, approvals: []}));
    const resetActiveEvents = () => state.set(data => ({...data, activeEvents: []}));
    // Reset the token state processed addresses
    const resetAddresses = () => tState.set(data => ({...data, uniqueAddresses: [], testedAddresses: []}));

    // Validate the address
    React.useEffect(() => setAddressValid(ethers.utils.isAddress(String(address))), [address]);

    React.useEffect(() => {
        resetTransfers();
        resetApprovals();
        resetAddresses();
        resetActiveEvents();
    }, [tokenData, networkData])

    React.useEffect(() => {
        if(address && networkData.default_tokens?.map(token => token.address).includes(address)) {
            // Don't reset token data or address as we're still on the same chain
        } else {
            // Reset the token data and address as we've changed chains
            setTokenData(undefined);
            setAddress('');
        }
    }, [networkData])

    const openExportModal = (variant: string): void => {
        setExportVariant(variant);
        stopListeningForEvent("Transfer");
        setOpenModal(true);
    }

    const fetchTokenData = () => {
        setError('');
        setTokenData(undefined);
        
        if(address && addressValid) {
            setLoading(true);
            getTokenData(address)
                .then(response => setTokenData(response))
                .catch(e => setError("Fetch error, are you sure the address is a token?"))
                .finally(() => setLoading(false))
        } else {
            setError("Address isn't valid");
        }
    }
    
    let transferThrottleHolder: ITransfer[] = [];
    let approvalThrottleHolder: IApproval[] = [];
    let uniquesThrottleHolder: string[] = [];

    const handleNewTransfer = (from: any, to: any, value: any, ...other: any) => {
        console.log("New transfer...", from);
        if(state.value?.transfers.length > state.value.listenerCap || !state.value.activeEvents.includes("Transfer")) return;
        let transfer: ITransfer = {to, from, value: value.toString()};
        // If we're throttling state writes we wait till the cap is hit before making a write, otherwise we write directly
        if(state.value.throttleCap > 1) {
            transferThrottleHolder.push(transfer);
            if(transferThrottleHolder.length >= state.value.throttleCap) {
                state.set(data => ({...data, transfers: [...data.transfers, ...transferThrottleHolder]}));
                transferThrottleHolder = [];
            }
        } else {
            state.set(data => ({...data, transfers: [...data.transfers, transfer]}));
        }
    }

    const handleNewApproval = (owner: any, spender: any, value: any, ...other: any) => {
        console.log("New approval...", owner);
        if(state.value?.approvals.length > state.value.listenerCap || !state.value.activeEvents.includes("Approval")) return;
        let approval: IApproval = {owner, spender, value: value.toString()};
        // If we're throttling state writes we wait till the cap is hit before making a write, otherwise we write directly
        if(state.value.throttleCap > 1) {
            approvalThrottleHolder.push(approval);
            if(transferThrottleHolder.length >= state.value.throttleCap) {
                state.set(data => ({...data, approvals: [...data.approvals, ...approvalThrottleHolder]}));
                approvalThrottleHolder = [];
            }
        } else {
            state.set(data => ({...data, approvals: [...data.approvals, approval]}));
        }
    }

    const handleUniqueAddresses = (from: any, to: any, value: any, ...other: any) => {
        console.log("New transfer for unique address...", from);
        if(tState.value?.uniqueAddresses.length > state.value.listenerCap || !state.value.activeEvents.includes("UNIQUES")) return;
        // If we're throttling state writes we wait till the cap is hit before making a write, otherwise we write directly
        
        if(state.value.throttleCap > 1) {
            uniquesThrottleHolder.push(from);
            uniquesThrottleHolder.push(to);
            
            if(uniquesThrottleHolder.length >= state.value.throttleCap) {
                let addresses = [...tState.value.uniqueAddresses, ...uniquesThrottleHolder];
                let new_addresses = addresses.filter((d, i) => addresses.indexOf(d) == i);
                tState.set(data => ({...data, uniqueAddresses: new_addresses}));
                uniquesThrottleHolder = [];
            }
        } else {
            let addresses = [...tState.value.uniqueAddresses, from, to];
            let new_addresses = addresses.filter((d, i) => addresses.indexOf(d) == i);
            tState.set(data => ({...data, uniqueAddresses: new_addresses}));
        }
    }
    

    const listenForTransfer = () => {
        let event = "Transfer";

        if(address && addressValid) {
            if(state.value.activeEvents.includes(event)) return;
            state.set(data => ({...data, activeEvents: [...data.activeEvents, event]}));
            subscribeToEvent(event, address, handleNewTransfer);
        }
    }

    const listenForApproval = () => {
        let event = "Approval";

        if(address && addressValid) {
            if(state.value.activeEvents.includes(event)) return;
            state.set(data => ({...data, activeEvents:  [...data.activeEvents, event]}));
            subscribeToEvent(event, address, handleNewApproval);
        }
    }

    const listenForUniqueAddresses = () => {
        if(address && addressValid) {
            if(state.value.activeEvents.includes("UNIQUES")) return;
            state.set(data => ({...data, activeEvents:  [...data.activeEvents, "UNIQUES"]}));
            subscribeToEvent("Transfer", address, handleUniqueAddresses);
        }
    }

    const stopListeningForEvent = (event: string) => {        
        if(!state.value.activeEvents.includes(event) || !address) return;
        state.set(data => ({...data, activeEvents: data.activeEvents.filter(e => e != event)}));
        
        if(event == "Transfer")
            unsubscribe(event, handleNewTransfer, address)
                .then(() => console.log(`Unsubscribe: ${event}`));
        if(event == "Approval")
            unsubscribe(event, handleNewApproval, address)
                .then(() => console.log(`Unsubscribe: ${event}`));
        
    }

    return (
        <>
            <TokensPresent
                address={address}
                setAddress={setAddress}
                addressValid={addressValid}
                tokenData={tokenData}
                fetchTokenData={fetchTokenData}

                listenForTransfer={listenForTransfer}
                listenForApproval={listenForApproval}
                stopListeningForEvent={stopListeningForEvent}
                listenForUniqueAddresses={listenForUniqueAddresses}
                resetAddresses={resetAddresses}
                activeEvents={state.value.activeEvents}
                stateData={state.value}
                tokenStateData={tState.value}
                networkData={networkData}

                listenerCap={state.value.listenerCap}
                setListenerCap={(value: number) => state.set(data => ({...data, listenerCap: value}))}
                throttleCap={state.value.throttleCap}
                setThrottleCap={(value: number) => state.set(data => ({...data, throttleCap: value}))}

                resetTransfers={resetTransfers}
                resetApprovals={resetApprovals}
                openExportModal={openExportModal}
                loading={loading}
                error={error}
            />

            <ExportModalContainer
                tokenData={tokenData}
                open={openModal}
                exportVariant={exportVariant}
                setOpen={setOpenModal}/>

        </>
    )
}