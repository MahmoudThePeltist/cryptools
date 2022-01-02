import { useState } from '@hookstate/core';
import { ethers } from 'ethers';
import React from 'react';
import { globalState } from '../../hooks/stateHooks';
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

    const state = useState(globalState);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
    const [address, setAddress] = React.useState<string>();
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

    // Validate the address
    React.useEffect(() => setAddressValid(ethers.utils.isAddress(String(address))), [address]);

    React.useEffect(() => {
        resetTransfers();
        resetApprovals();
        resetActiveEvents();
    }, [tokenData, networkData])

    const openExportModal = (variant: string): void => {
        setExportVariant(variant);
        setOpenModal(true);
    }

    const fetchTokenData = () => {
        setError(undefined);
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

    const handleNewTransfer = (from: any, to: any, value: any, ...other: any) => {
        if(state.value?.transfers.length > state.value.listenerCap || !state.value.activeEvents.includes("Transfer")) return;
        let transfer: ITransfer = {to, from, value: value.toString()};
        state.set(data => ({...data, transfers: [...data.transfers, transfer]}));
    }

    const handleNewApproval = (owner: any, spender: any, value: any, ...other: any) => {
        if(state.value?.approvals.length > state.value.listenerCap || !state.value.activeEvents.includes("Approval")) return;
        let approval: IApproval = {owner, spender, value: value.toString()};
        state.set(data => ({...data, approvals: [...data.approvals, approval]}));
    }

    const listenForTransfer = () => {
        let event = "Transfer";
        resetTransfers();

        if(address && addressValid) {
            if(state.value.activeEvents.includes(event)) return;
            state.set(data => ({...data, activeEvents: [...data.activeEvents, event]}));
            subscribeToEvent(event, address, handleNewTransfer);
        }
    }

    const listenForApproval = () => {
        let event = "Approval";
        resetApprovals();

        if(address && addressValid) {
            if(state.value.activeEvents.includes(event)) return;
            state.set(data => ({...data, activeEvents:  [...data.activeEvents, event]}));
            subscribeToEvent(event, address, handleNewApproval);
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
                activeEvents={state.value.activeEvents}
                stateData={state.value}
                networkData={networkData}
                listenerCap={state.value.listenerCap}
                setListenerCap={(value: number) => state.set(data => ({...data, listenerCap: value}))}

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