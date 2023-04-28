import {abi as PortfolioABI} from "@primitivexyz/portfolio/optimized-out/IPortfolio.sol/IPortfolio.json";
import { sepolia } from 'viem/chains'
import {
  createPublicClient,
  http,
  getContract
} from 'viem'

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
})

async function main() {
    const portfolioAddress = '0x3f368452526f957E03E4Dd66422214908B1B4FaD' // Replace with the correct address given the network.
    const portfolio = getContract({
        address: portfolioAddress,
        abi: PortfolioABI,
        publicClient: client
    })
    const version = await portfolio.read.VERSION()
    console.log(`Portfolio Version: ${version}`)
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
})