export const isProdEnv = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const MAX_INT = 2n ** 256n - 1n;

export const SUPPORTED_CHAIN = {
  mainnet: [1, 10, 56, 137, 250, 42161],
  testnet: [5, 97, 420, 4002, 80001, 421613],
};

/**
 * MOVE_MY_NFT CONTRACT ADDRESS Deployed at the same address on:
 *  - Ethereum, Goerli,
 *  - BSC, BSC Testnet,
 *  - Polygon, Polygon Mumbai,
 *  - Optimism, Optimism Goerli,
 *  - ArbitrumOne, Arbitrum Testnet,
 *  - Fantom Opera, Fantom Testnet
 */
export const MOVE_MY_NFT = "0x505E76dd375DEd411101eD80E23DEb93db4c323A"; // OK, verified

/**
 * ALTERNATIVE PUBLIC GATEWAY:
 * - "https://gateway.ipfs.io/ipfs/"
 * - "https://ipfs.io/ipfs/" //Not working
 * - "https://ipfs.fleek.co/ipfs/"
 * - "https://ipfs.moralis.io:2053/ipfs/"
 * - "https://cloudflare-ipfs.com/ipfs/"
 *
 */

export const IPFS_GATEWAY = "https://cloudflare-ipfs.com/ipfs/";
