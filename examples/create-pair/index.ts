import {abi as PortfolioABI} from "@primitivexyz/portfolio/optimized-out/RMM01Portfolio.sol/RMM01Portfolio.json";
import { sepolia } from 'viem/chains'
import {
  http,
  createWalletClient,
  encodePacked,
  getContract,
  createPublicClient
} from 'viem'

import * as dotenv from 'dotenv'
import { privateKeyToAccount } from "viem/accounts";
dotenv.config()


const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
const client = createPublicClient({
  chain: sepolia,
  transport: http(),
})
const wallet = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
})

const portfolioAddress = '0x3f368452526f957E03E4Dd66422214908B1B4FaD' // Replace with the correct address given the network.
const portfolio = getContract({
    address: portfolioAddress,
    abi: PortfolioABI,
    walletClient: wallet,
    publicClient: client
})

async function createPair() {

  const asset = "0x2F131A4A8462fA926e54325Ec7398c93Eae107DB" as `0x${string}` // sepolia test USDC
  const quote = "0x211C90E03e9479d6CeB1b54599dC19B6515BfCf0" as `0x${string}` // seploia test USDT

  // Portfolio requires that arguments are encoded in a specific way, let's build the encoded data to send to Portfolio:
  const instruction = 0x0C // The instruction to signal to Portfolio to create a pair is 0x0C
  const encodedData = encodePacked(
    ['uint8', 'address', 'address'],
    [instruction, asset, quote]
  )

  // Use the write instance from the boiler plate to create a new pair by passing the `encodedData` to Portfolio's `multiprocess` function.
  const txHash = await portfolio.write.multiprocess([encodedData]) // Note: encoded data is in an array, which is passed to multiprocess.

  console.log(`Created pair in tx hash: ${txHash}`)
}

async function getPair() {
  const data = await portfolio.read.pairs([1]) // Assuming we created the very first pair, it will have a nonce of 1.

  console.log(`Pair info: ${JSON.stringify(data)}`)
}

async function main() {
    await createPair()
    await getPair()
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
})