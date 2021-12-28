
export interface INetworkData {
    id: number,
    label: string,
    type: string,
    scan: string
}

export interface INetworkDataMapping {
    [index: number]: INetworkData
}

// A list of blockchains and their details
export const networks: INetworkDataMapping = {
    1: {id: 1, label: 'ETH Mainnet', type: 'ETH', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'},
    3: {id: 3, label: 'ETH Ropsten Testnet', type: 'ETH', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'},
    4: {id: 4, label: 'ETH Rinkeby Testnet', type: 'ETH', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'},
    5: {id: 5, label: 'ETH Goerli Testnet', type: 'ETH', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'},
    42: {id: 42, label: 'ETH Kovan Testnet', type: 'ETH', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'},

    61: {id: 61, label: 'ETC Mainnet', type: 'ETC', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'},
    6: {id: 6, label: 'ETC Kotti Testnet', type: 'ETC', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'},
    63: {id: 63, label: 'ETC Mordor Testnet', type: 'ETC', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'},

    // 56: {id: 56, label: 'BSC Mainnet', type: 'BSC', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'}, // TBD
    // 97: {id: 97, label: 'BSC Testnet', type: 'BSC', scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J'}, // TBD
    // 10: {id: 10, label: 'optimism', type: '', scan: ''}, // TBD
    // 62: {id: 62, label: 'classicMorden', type: '', scan: ''}, // TBD
    // 69: {id: 69, label: 'optimism-kovan', type: '', scan: ''}, // TBD
}

// converting the mapping into an array for itterative purposes
export const networksArray: INetworkDataMapping[] = Object.values(networks);