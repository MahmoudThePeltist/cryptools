
export interface IDefaultToken {
    name: string,
    address: string
}

export interface INetworkData {
    id: number,
    label: string,
    type: string,
    avg_blocktime: number,
    scanner_site?: string,
    url?: string,
    scan?: string,
    default_tokens?: IDefaultToken[]
}

export interface INetworkDataMapping {
    [index: number]: INetworkData
}

// A list of blockchains and their details
export const networks: INetworkDataMapping = {
    1: {
        id: 1, label: 'ETH Mainnet', type: 'ETH',
        scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J',
        scanner_site: 'https://etherscan.io',
        avg_blocktime: 13.19,
        default_tokens: [
            {name: 'BNB', address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'},
            {name: 'Tether USD', address: '0xdac17f958d2ee523a2206206994597c13d831ec7'},
            {name: 'USD Coin', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'},
            {name: 'HEX', address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39'},
            {name: 'SHIBA INU', address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'},
        ]
    },
    3: {
        id: 3, label: 'ETH Ropsten Testnet', type: 'ETH',
        scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J',
        scanner_site: 'https://ropsten.etherscan.io',
        avg_blocktime: 15,
        default_tokens: []
    },
    4: {
        id: 4, label: 'ETH Rinkeby Testnet', type: 'ETH',
        scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J',
        scanner_site: 'https://rinkeby.etherscan.io',
        avg_blocktime: 15,
        default_tokens: []
    },
    5: {
        id: 5, label: 'ETH Goerli Testnet', type: 'ETH',
        scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J',
        scanner_site: 'https://goerli.etherscan.io',
        avg_blocktime: 15,
        default_tokens: []
    },
    42: {
        id: 42, label: 'ETH Kovan Testnet', type: 'ETH',
        scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J',
        scanner_site: 'https://kovan.etherscan.io',
        avg_blocktime: 15,
        default_tokens: []
    },
    61: {
        id: 61, label: 'ETC Mainnet', type: 'ETC',
        scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J',
        avg_blocktime: 18,
        default_tokens: []
    },
    6: {
        id: 6, label: 'ETC Kotti Testnet', type: 'ETC',
        scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J',
        avg_blocktime: 18,
        default_tokens: []
    },
    63: {
        id: 63, label: 'ETC Mordor Testnet', type: 'ETC',
        scan: 'WPDNZ2MDAD7NIXM32NV9TXCCEBYTD6582J',
        avg_blocktime: 18,
        default_tokens: []
    },
    56: {
        id: 56, label: 'BSC Mainnet', type: 'BSC',
        url: 'https://bsc-dataseed.binance.org/',
        scanner_site: 'https://bscscan.com',
        avg_blocktime: 3,
        default_tokens: [
            {name: 'wBNB', address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'},
            {name: 'BSC-USD', address: '0x55d398326f99059ff775485246999027b3197955'},
            {name: 'wETH', address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8'},
            {name: 'CAKE-LP BUSD-BNB', address: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16'},
            {name: 'CAKE-LP CAKE-BNB', address: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0'},
        ]
    },
    97: {
        id: 97, label: 'BSC Testnet', type: 'BSC',
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        scanner_site: 'https://testnet.bscscan.com',
        avg_blocktime: 3,
        default_tokens: [
            {name: 'SWAPX-LP', address: '0x3BFcD139a952baCf16425B32af62Aa4b8f569775'},
            {name: 'BUSD', address: '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7'},
            {name: 'DAI', address: '0x8a9424745056eb399fd19a0ec26a14316684e274'},
            {name: 'BUTT', address: '0x5a6871Eca99c546EB5F73361b4e91EDd11E22247'},
        ]
    },
}

// converting the mapping into an array for itterative purposes
export const networksArray: INetworkDataMapping[] = Object.values(networks);