import { Abi } from "viem";

export const MMNFT_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "tokenIdsLength", type: "uint256" },
      { internalType: "uint256", name: "tokenAmountsLength", type: "uint256" },
    ],
    name: "BatchSizeNotMatching",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "batchLength", type: "uint256" },
      { internalType: "uint256", name: "maxBatchSize", type: "uint256" },
    ],
    name: "BatchTooLarge",
    type: "error",
  },
  {
    inputs: [],
    name: "MAX_BATCH_SIZE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ERC1155Partial", name: "tokenContract", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { internalType: "uint256[]", name: "tokenAmounts", type: "uint256[]" },
    ],
    name: "batchTransferERC1155",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ERC721Partial", name: "tokenContract", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "batchTransferERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as Abi;
