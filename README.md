# Moud's Dev Cryptools
A small project to mess around with some crypto concepts. Will try to continue to build on it depending on my free time.

## Features
 * Supports 10 blockchains.
 * Fetch the latest block data and transactions for the selected blockchain.
 * Predicts which blocks will be mined on which date.
 * Fetch data about a specific ERC20 standard token on the selected blockchain.
 * Token event listening, data gathering and export as CSV.
 * Collect unique addresses, check for humans/smart contract and  export as CSV.
 
## Technology
1. Built using React via Create-React-App
2. Built in Typescript
3. Styling in SCSS
4. Blockchain connection using ethers.js
5. Presistant state management using hookstate.js
6. UIs developed in Material UI
7. CI/CD with firebase hosting

## Serving project
### Using NPM:
1. `npm install`
2. `npm start`

### Using Yarn:
1. `yarn install`
2. `yarn start`

## Deployment
currently deployed on firebase at: `https://mouds-cryptools.web.app/`