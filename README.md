# AutoHODL SYT Skill

A skill for AI agents to manage sUSDC (Spendable Yield Tokens) on the Linea blockchain — converting idle USDC into yield-bearing tokens so users save while they spend.

## Overview

sUSDC is a rebasing token backed 1:1 by USDC. Holding sUSDC earns yield automatically; the balance grows over time without any manual claiming. This skill provides three operations:

- **Mint** — deposit USDC and receive sUSDC
- **Balance** — check sUSDC balance (and its underlying USDC value)
- **Transfer** — send sUSDC to another address (underlying USDC moves with it)

## Prerequisites

- Node.js v18+
- A wallet funded with USDC on Linea mainnet
- A Linea RPC endpoint (e.g. `https://rpc.linea.build`)

## Installation

```bash
npm install
```

## Configuration

Set the following environment variables before running any script:

| Variable | Description |
|---|---|
| `AGENT_PRIVATE_KEY` | Hex private key of the wallet executing transactions |
| `RPC_URL` | Linea RPC endpoint |

```bash
export AGENT_PRIVATE_KEY=0x...
export RPC_URL=https://rpc.linea.build
```

## Usage

### Mint sUSDC

Deposit USDC and receive sUSDC. On first use, this approves the Locker Router for unlimited USDC spending (one-time transaction).

```bash
node scripts/mintSYT.js <amount>

# Example: deposit 10.5 USDC
node scripts/mintSYT.js 10.5
```

### Check Balance

Query the sUSDC balance of an address. Defaults to the agent's own wallet if no address is provided.

```bash
node scripts/getSYTBalance.js [address]

# Check agent's own balance
node scripts/getSYTBalance.js

# Check another address
node scripts/getSYTBalance.js 0x7c334f35BF2B4a9e55f60CF3287c885598cF9A02
```

### Transfer sUSDC

Send sUSDC to a recipient. The script verifies sufficient balance before executing.

```bash
node scripts/transferSYT.js <recipient> <amount>

# Example: send 20 sUSDC
node scripts/transferSYT.js 0x7c334f35BF2B4a9e55f60CF3287c885598cF9A02 20
```

## Contract Addresses (Linea Mainnet)

| Contract | Address |
|---|---|
| USDC | `0x176211869cA2b568f2A7D4EE941E073a821EE1ff` |
| sUSDC (SYT) | `0x060c1cBE54a34deCE77f27ca9955427c0e295Fd4` |
| Locker Router | `0xa289AE6ed8336CaB82626c3ff8e5Af334Eb7E0DE` |

## Notes

**Rebase awareness** — sUSDC is a rebasing token. The raw balance returned by the contract increases over time as yield accrues. Always use `getSYTBalance.js` for the current balance rather than caching a previous value.

**Infinite approval** — `mintSYT.js` requests unlimited USDC approval on first use to avoid repeated approval transactions. This is a common pattern for DeFi protocols.
