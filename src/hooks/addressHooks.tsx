import React from "react";
import { useGetProvider } from "./useGetProvider";

export const useCheckIfNotContract = () => {
    const provider = useGetProvider();

    return React.useCallback(async (address: string): Promise<any> => {
        if(!address) throw("Address required");
        const code = await provider.getCode(address);

        if(code == '0x') 
            return true;
        else
            return false;
    }, [provider]);
}
export const useGetCode = () => {
    const provider = useGetProvider();

    return React.useCallback(async (address: string): Promise<any> => {
        if(!address) throw("Address required");
        return await provider.getCode(address);
    }, [provider]);
}

export const useCheckManyIfNotContract = () => {
    const provider = useGetProvider();

    return React.useCallback(async (addresses: string[], callback): Promise<void> => {
        for(let address of addresses) {
            if(!address) continue;
            const code = await provider.getCode(address);

            if(code == '0x') 
                callback(address, true);
            else
                callback(address, false);
        }
    }, [provider]);
}