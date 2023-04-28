import {abi as PortfolioABI, bytecode as PortfolioBytecode} from "@primitivexyz/portfolio/optimized-out/RMM01Portfolio.sol/RMM01Portfolio.json";
import { sepolia } from 'viem/chains'
import {
  http,
  createWalletClient
} from 'viem'

import * as dotenv from 'dotenv'
import { privateKeyToAccount } from "viem/accounts";
dotenv.config()


const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
const wallet = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
})

async function main() {
    const weth = "0xC5C77F2cd3567cEaa89CdA4293E2D7C34c47F5a5" // sepolia test WETH
    const registry = "0x0000000000000000000000000000000000000000" // for this example, not using a registry.

    const txHash = await wallet.deployContract({
      abi: PortfolioABI,
      bytecode: PortfolioBytecode.object as `0x${string}`,
      account,
      args: [weth, registry]
    })

    console.log(`Deployed Portfolio in tx hash: ${txHash}`)
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
})