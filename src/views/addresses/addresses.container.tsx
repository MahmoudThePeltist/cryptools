
import React from 'react';
import { ethers } from 'ethers';
import { useChainData } from '../../hooks/useGetProvider';
import { AddressesPresent } from "./addresses.present"
import { useGetCode } from '../../hooks/addressHooks';

export const AddressesContainer = () => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');
    const [addressValid, setAddressValid] = React.useState<boolean>(false);
    const [isContract, setIsContract] = React.useState<boolean>();
    const [bytecode, setBytecode] = React.useState<string>('');

    const networkData = useChainData();
    const getCode = useGetCode();

    // Validate the address
    React.useEffect(() => setAddressValid(ethers.utils.isAddress(String(address))), [address]);

    React.useEffect(() => {
        if(address && networkData.default_tokens?.map(token => token.address).includes(address)) {
            // Don't reset token data or address as we're still on the same chain
        } else setAddress('');
        
    }, [networkData])
    
    const checkIfSmartContract = () => {
        setLoading(true);
        if(address && addressValid)
            getCode(address)
                .then((code) => {
                    setIsContract(code != '0x');
                    setBytecode(code);
                })
                .finally(() => setLoading(false));
    }    

    return (
        <>
            <AddressesPresent
                networkData={networkData}
                address={address}
                setAddress={setAddress}
                addressValid={addressValid}
                checkIfSmartContract={checkIfSmartContract}
                bytecode={bytecode}
                isContract={isContract}
                loading={loading}
                error={error}
            />

        </>
    )
}