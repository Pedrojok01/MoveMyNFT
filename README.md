<div align="center">
<img src="./public/images/movemynft_logo_transparent.png"  width="500px" />

<h1><strong> The easiest and fastest way to transfer your NFTs between addresses.</strong></h1>

[![Stargazers](https://img.shields.io/github/stars/Pedrojok01/movemynft)](https://github.com/Pedrojok01/movemynft-app/stargazers)
[![Issues](https://img.shields.io/github/issues/Pedrojok01/movemynft)](https://github.com/Pedrojok01/movemynft-app/issues)
[![MIT License](https://img.shields.io/github/license/Pedrojok01/movemynft)](https://github.com/Pedrojok01/movemynft-app/blob/main/License)
[![codecov](https://codecov.io/github/Pedrojok01/movemynft/branch/main/graph/badge.svg?token=XBKTMGRQ5S)](https://codecov.io/github/Pedrojok01/movemynft)

</div>

## Description

Multichain Dapp deployed on Ethereum, Optimism, Arbitrum, Polygon, Fantom and Binance Smart-Chain. Allow any user to quickly and simply transfer some, or all NFTs from a collection (either ERC721 or ERC1155) from one address to another in one clic.

- Website: https://movemynft.com/
  <br></br>

![Preview](./public/images/preview.gif)

## Smart-contracts verified on:

- etherscan: https://etherscan.io/address/0x505E76dd375DEd411101eD80E23DEb93db4c323A
- optimism: https://optimistic.etherscan.io/address/0x505E76dd375DEd411101eD80E23DEb93db4c323A
- arbitrum: https://arbiscan.io/address/0x505E76dd375DEd411101eD80E23DEb93db4c323A
- polygon: https://polygonscan.com/address/0x505E76dd375DEd411101eD80E23DEb93db4c323A
- fantom: https://ftmscan.com/address/0x505E76dd375DEd411101eD80E23DEb93db4c323A
- bsc: https://bscscan.com/address/0x505E76dd375DEd411101eD80E23DEb93db4c323A

## Built With

- [![React][react.js]][react-url]
- [![typescript]][typescript-url]
- [![AntDesign]][antdesign-url]
- [![Rainbowkit]][rainbowkit-url]
- [![prettier]][prettier-url]
- [![ESLint]][eslint-url]

## Front-end Installation

💿 Clone the repo and install all dependencies:

Start by cloning the repo:

```bash
git clone https://github.com/Pedrojok01/MoveMyNFT.git .
```

Then install all dependencies:

```bash
yarn
```

✏ Edit the `.env.example` file in the main folder with all required info. Don't forget to remove `.example` !
Example:

```jsx
NEXT_PUBLIC_NODE_ENV = development;
NEXT_PUBLIC_ALCHEMY_API_KEY = api_key_here;
NEXT_PUBLIC_URL = "http://localhost:3000/";
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = api_key_here;
MORALIS_API_KEY = api_key_here;
ALCHEMY_API_KEY = api_key_here;
```

🔎 Locate the file constant.js in `src/data/constant.ts` and paste your smart-contracts addresses;

```jsx
export const MOVE_MY_NFT = "0x505E76dd375DEd411101eD80E23DEb93db4c323A";
```

🔎 Locate the ABIs files in the `src/data/abis` folder and edit your ABIs if you've made any changes to the smart-contracts;

```jsx
export const NFT_ABI = ["NFT ABI here...];
```

🚴‍♂️ Run your App:

Dev. mode:

```bash
yarn dev
```

Prod. mode:

```bash
yarn start
```

## Smart-contract deployment

💿 Move inside the `hardhat` folder and install all dependencies:

```sh
cd hardhat
```

Then install all dependencies:

```sh
yarn install
```

✏ Edit the `.env.example` file in the main folder with all required info. Don't forget to remove `.example` !

✏ Edit the hardhat.config.ts as needed, if needed, then make sure to select the correct network in the package.json `script` section.

```json
"scripts": {
        ...
        "deploy": "hardhat run --network ethereum scripts/deploy.ts",
        ...
    },
```

💿 Test that everything is working as intended:

> _Note: The code coverage is limited to the smart-contracts, the front-end is not covered._

```sh
yarn test
```

💿 Run Slither analyzer:

```sh
yarn slither
```

💿 Deploy your contracts:

```sh
yarn deploy
```

<div align="center">
<h2>Enjoy!!!</h2>

### ⭐️ ... and don't forget to leave a star if you like it! ⭐️

</div>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React_v18.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript]: https://img.shields.io/badge/typescript_v5.1.6-375BD2?style=for-the-badge&logo=typescript&logoColor=61DAFB
[typescript-url]: https://www.typescriptlang.org/
[Rainbowkit]: https://img.shields.io/badge/Rainbowkit-006600?style=for-the-badge&logo=data:image/jpeg;base64,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&logoColor=4FC08D
[rainbowkit-url]: https://github.com/rainbow-me/rainbowkit#readme
[antdesign]: https://img.shields.io/badge/AntDesign_v5.8.2-FF0000?style=for-the-badge&logo=AntDesign&logoColor=61DAFB
[antdesign-url]: https://ant.design/
[prettier]: https://img.shields.io/badge/Prettier_v3-360D3A?style=for-the-badge&logo=Prettier&logoColor=61DAFB
[prettier-url]: https://prettier.io/
[eslint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=61DAFB
[eslint-url]: https://eslint.org/
