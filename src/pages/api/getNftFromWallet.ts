import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";

import { getMoralisChain } from "@/utils/getMoralisChain";

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

if (!MORALIS_API_KEY) {
    throw new Error("MORALIS_API_KEY is not defined");
}

// Start Moralis
if (!Moralis.Core.isStarted) {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { account, chainId } = req.body;
    const moralisChain = getMoralisChain(chainId);

    if (!account || !chainId) {
        return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    if (!moralisChain) {
        return res.status(400).json({ success: false, message: "moralisChain missing" });
    }

    try {
        console.log(`REQUEST NFTs FOR USER ${account}`);

        // Fetch user NFTs
        const tx = await Moralis.EvmApi.nft.getWalletNFTs({
            address: account,
            chain: moralisChain,
            normalizeMetadata: true,
        });

        const nfts = tx.raw.result ? [...tx.raw.result] : [];
        let currentTx = tx;

        while (currentTx.hasNext()) {
            const nextTx = await currentTx.next();
            if (nextTx.raw.result) {
                nfts.push(...nextTx.raw.result);
            }
            currentTx = nextTx;
        }

        const total = nfts.length;
        const userNfts = { nfts, total };

        // Fetch all NFT collection owned by user
        const response_collections = await Moralis.EvmApi.nft.getWalletNFTCollections({
            address: account,
            chain: moralisChain,
        });

        const collections = response_collections.raw.result;

        res.status(200).json({
            success: true,
            message: "NFTs fetched successfully!",
            data: {
                userNfts,
                collections,
            },
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: `An error occured while fetching the NFTs: ${error.message}`,
            data: null,
        });
    }
};

export default handler;
