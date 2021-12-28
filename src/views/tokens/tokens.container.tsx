import { ethers } from 'ethers';
import React from 'react';
import { useGetTokenContract, useGetTokenData } from '../../hooks/tokenHooks';
import { TokensPresent } from "./tokens.present"

export const TokensContainer = () => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
    
    const [address, setAddress] = React.useState<string>();
    const [addressValid, setAddressValid] = React.useState<boolean>(false);
    const [tokenData, setTokenData] = React.useState<any>();
    const getTokenData = useGetTokenData();
    
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

    // Validate the address
    React.useEffect(() => setAddressValid(ethers.utils.isAddress(String(address))), [address]);

    return (
        <TokensPresent
            address={address}
            setAddress={setAddress}
            loading={loading}
            addressValid={addressValid}
            tokenData={tokenData}
            fetchTokenData={fetchTokenData}
            error={error}
        />
    )
}