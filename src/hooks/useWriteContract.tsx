import { useState, useEffect } from "react";

import { FileSearchOutlined } from "@ant-design/icons";
import { BigNumber } from "ethers";
import { PublicClient, WalletClient, getContract, parseAbiItem } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

import { useUserData } from "../context/UserContextProvider";
import { MMW_ABI, ERC20_ABI, NFT_ABI } from "../data/abis";
import { getContractAddress } from "../data/constant";
import { getExplorer } from "../utils/getExplorerByChain";
import { openNotification } from "../utils/notifications";

export const useWriteContract = () => {
    const { address, chainId } = useUserData();
    const mmw = getContractAddress(chainId);
    const publicClient: PublicClient = usePublicClient();
    const { data: walletClient, isError, isLoading } = useWalletClient();
    const [signer, setSigner] = useState<WalletClient>();

    useEffect(() => {
        if (!isLoading && !isError && walletClient) {
            setSigner(walletClient);
        }
    }, [isLoading, isError, walletClient]);

    const mmwInstance = getContract({ abi: MMW_ABI, address: mmw as `0x${string}`, walletClient: signer });

    /* Set Token Allowance:
     ***************************/
    const approveToken = async (token: string, allowance: BigNumber) => {
        const tokenInstance = getContract({
            abi: ERC20_ABI,
            address: token as `0x${string}`,
            walletClient: signer,
        });

        try {
            await tokenInstance.write.approve([mmw, allowance]);
            const value = parseInt(allowance.toString()) / 10 ** 18;
            const title = "Token Approval set";
            const msg = `Allowance succesfully set to ${value}.`;
            openNotification("success", title, msg);
        } catch (error: any) {
            console.error(error.reason);
            const title = "Token Approval denied";
            const msg = ` Something went wrong while setting the allowance. \n 
            Reason: ${error.reason}`;
            openNotification("error", title, msg);
        }
    };

    /* Set Token Allowance:
     ***************************/
    const approveNft = async (nft: string) => {
        const nftInstance = getContract({
            abi: NFT_ABI,
            address: nft as `0x${string}`,
            walletClient: signer,
        });

        try {
            await nftInstance.write.setApprovalForAll([mmw, true]);
            const title = "NFT Approval set";
            const msg = `Allowance succesfully set.`;
            openNotification("success", title, msg);
        } catch (error: any) {
            console.error(error.reason);
            const title = "NFT Approval denied";
            const msg = ` Something went wrong while setting the allowance.\n 
            Reason: ${error.reason}`;
            openNotification("error", title, msg);
        }
    };

    const executeBundle = async (addresses: string[], numbers: (string | number)[]) => {
        try {
            const hash = await mmwInstance.write.safeMint([address, addresses, numbers]);

            return new Promise((resolve, reject) => {
                publicClient.watchEvent({
                    address: mmw as `0x${string}`,
                    event: parseAbiItem(
                        "event AssemblyAsset(address indexed firstHolder, uint256 indexed tokenId, uint256 salt, address[] addresses, uint256[] numbers)"
                    ),
                    args: {
                        firstHolder: address,
                    },
                    onLogs: (logs: any) => {
                        const data: AssemblyEventData = {
                            addresses: logs[0].args?.addresses,
                            blockHash: logs[0].blockHash,
                            blockNumber: Number(logs[0].blockNumber),
                            chainId: chainId,
                            numbers: logs[0].args?.numbers.map((item: BigNumber) => item.toString()),
                            ownerOf: logs[0].args?.firstHolder.toLowerCase(),
                            salt: Number(logs[0].args?.salt),
                            tokenId: logs[0].args?.tokenId.toString(),
                            transactionHash: hash,
                        };

                        const title = "Bundle Created";
                        const link = `${getExplorer(chainId)}tx/${hash}`;
                        const msg = (
                            <>
                                Your bundle has been successfully created!
                                <br></br>
                                <a href={link} target="_blank" rel="noreferrer noopener">
                                    View in explorer: &nbsp;
                                    <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
                                </a>
                            </>
                        );
                        openNotification("success", title, msg);
                        resolve({
                            success: true,
                            data,
                        });

                        // Add code to stop watching for events here
                    },
                });
            });
        } catch (error: any) {
            console.error(error.reason ?? error.message ?? error);
            const title = "Unexpected error";
            const msg = `Oops, something went wrong while bundling your assets. \n 
            Reason: ${error.reason}`;
            openNotification("error", title, msg);
            return Promise.resolve({ success: false, data: null });
        }
    };

    const executeTransfer = async (
        receiver: string,
        tokenId: string,
        salt: number,
        addresses: string[],
        numbers: (string | number)[]
    ) => {
        try {
            const hash = await mmwInstance.write.burn([receiver, tokenId, salt, addresses, numbers]);
            const transaction = await publicClient.waitForTransactionReceipt({
                hash: hash,
            });
            const link = `${getExplorer(chainId)}tx/${hash}`;
            const title = "Assets unpacked!";
            const msg = (
                <>
                    Your assets has been succesfully transfered!
                    <br></br>
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        View in explorer: &nbsp;
                        <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
                    </a>
                </>
            );
            openNotification("success", title, msg);
            return { success: true, data: transaction };
        } catch (error: any) {
            console.error(error.reason ?? error.message ?? error);
            const title = "Unexpected error";
            const msg = `Oops, something went wrong while transfering your assets. \n 
            Reason: ${error.reason}`;
            openNotification("error", title, msg);
            return { success: false, data: null };
        }
    };

    return {
        approveToken,
        approveNft,
        executeBundle,
        executeTransfer,
    };
};
