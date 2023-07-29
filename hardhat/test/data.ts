import { ethers } from "hardhat";

export const ids = Array.from(Array(100).keys());
export const amounts: number[] = new Array(100).fill(1);
export const data = ethers.encodeBytes32String("");
