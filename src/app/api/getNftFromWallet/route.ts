import Moralis from "moralis";
import { NextRequest, NextResponse } from "next/server";

import { getMoralisChain } from "@/utils/getMoralisChain";

type RequestBody = {
  account: `0x${string}`;
  chainId: number;
};

export const runtime = "nodejs";

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

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { account, chainId } = (await request.json()) as RequestBody;

  const moralisChain = getMoralisChain(chainId);

  if (!account || !chainId) {
    return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
  }

  if (!moralisChain) {
    return NextResponse.json({ success: false, message: "moralisChain missing" }, { status: 400 });
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

    return NextResponse.json({
      success: true,
      message: "NFTs fetched successfully!",
      data: {
        userNfts,
        collections,
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message ?? "Unknown error occurred";
    console.error("Error in Moralis data fetching:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred",
        error: errorMessage,
        data: null,
      },
      { status: 500 }
    );
  }
}
