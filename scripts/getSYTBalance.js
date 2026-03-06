const { createPublicClient, http, formatUnits, parseAbiItem } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const { linea } = require('viem/chains');

const SYT_ADDRESS = "0x060c1cBE54a34deCE77f27ca9955427c0e295Fd4"; // Linea sUSDC address 
const USER_ADDRESS = privateKeyToAccount(process.env.AGENT_PRIVATE_KEY).address;

// Standard ERC20 balanceOf + decimals
const balanceAbi = [
    parseAbiItem('function balanceOf(address account) view returns (uint256)'),
    parseAbiItem('function decimals() view returns (uint8)'),
    parseAbiItem('function symbol() view returns (string)')
];

async function main() {
    const publicClient = createPublicClient({
        chain: linea,
        transport: http(process.env.RPC_URL)
    });

    if (!SYT_ADDRESS) {
        console.error("SYT_ADDRESS is not defined in the environment.");
        return;
    }

    // Default to the agent's own address if none is provided
    const targetAddress = process.argv[2] || USER_ADDRESS;

    try {
        const [balance, decimals, symbol] = await Promise.all([
            publicClient.readContract({
                address: SYT_ADDRESS,
                abi: balanceAbi,
                functionName: 'balanceOf',
                args: [targetAddress]
            }),
            publicClient.readContract({
                address: SYT_ADDRESS,
                abi: balanceAbi,
                functionName: 'decimals'
            }),
            publicClient.readContract({
                address: SYT_ADDRESS,
                abi: balanceAbi,
                functionName: 'symbol'
            })
        ]);

        const formattedBalance = formatUnits(balance, decimals);
        console.log(`Address: ${targetAddress}`);
        console.log(`Balance: ${formattedBalance} ${symbol}`);
        
    } catch (error) {
        console.error("Error fetching balance:", error.message);
    }
}

main().catch(console.error);