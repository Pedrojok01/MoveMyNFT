import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";

import { getMoralisChain } from "../../utils/getMoralisChain";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

    if (!MORALIS_API_KEY) {
        return res.status(400).json({ success: false, message: "MORALIS_API_KEY is not defined" });
    }

    const { account, chainId } = req.body;

    if (!account || !chainId) {
        return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const moralisChain = getMoralisChain(chainId);

    if (!moralisChain) {
        return res.status(400).json({ success: false, message: "moralisChain missing" });
    }

    // Start Moralis
    if (!Moralis.Core.isStarted) {
        await Moralis.start({
            apiKey: MORALIS_API_KEY,
        });
    }

    try {
        console.log(`REQUEST MORALIS DATA FOR USER ${account}`);

        // Fetch user NFTs
        const tx = await Moralis.EvmApi.nft.getWalletNFTs({
            address: account,
            chain: moralisChain,
            disableTotal: false,
            normalizeMetadata: true,
        });

        let nfts: any[] = [];
        const nfts_1 = tx.raw.result;
        const total = tx.raw.total;

        nfts.push(nfts_1);
        nfts.flat();

        if (total && total > 100) {
            let currentTx = tx;
            for (let i = 0; i < Math.min(total, 500) / 100 - 1; i++) {
                const nextTx = await currentTx.next();
                nfts.push(nextTx.raw.result);
                currentTx = nextTx;
            }
        }

        nfts = nfts.flat();
        const userNfts = { nfts: nfts, total: total ?? 0 };

        // Fetch all NFT collection owned by user
        const response_collections = await Moralis.EvmApi.nft.getWalletNFTCollections({
            address: account,
            chain: moralisChain,
        });

        const collections = response_collections.raw.result;

        // Fetch user native's balance
        const response_Native = await Moralis.EvmApi.balance.getNativeBalance({
            address: account,
            chain: moralisChain,
        });

        const nativeBalance = response_Native.raw.balance;

        // Fetch all ERC20 tokens owned by the user
        const response_Token = await Moralis.EvmApi.token.getWalletTokenBalances({
            address: account,
            chain: moralisChain,
        });

        const tokenBalance = response_Token.toJSON();

        res.status(200).json({
            success: true,
            message: "Moralis data fetched successfully!",
            data: {
                userNfts: userNfts,
                collections: collections,
                nativeBalance: nativeBalance,
                tokenBalance: tokenBalance,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "An error occured while updating the DB!",
            data: null,
        });
    }
};

export default handler;
