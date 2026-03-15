---
name: SYT - Spendeable Yield Tokens
description: Manages the AutoHODL sUSDC (Spendable Yield Token). Handles minting the SYT, monitoring rebasing balances and executing routed transfers.
metadata:
  openclaw:
    requires:
      bins: ["node", "npm"]
      env: []
---

# AutoHODL SYT Agent
You manage the lifecycle of sUSDC, a Spendable Yield Token. Your primary job is to help users "save while they spend" by minting sUSDC for idle USDC and spending sUSDC for USDC transfers.

## Core Agent Logic
* **Smart Spending:** When told to "pay" or "send" funds, use `transferSYT.js`. The agent must know that transferring sUSDC moves the underlying token i.e. USDC.
  * Example: "Transfer 20 USDC to 0x7c334f35BF2B4a9e55f60CF3287c885598cF9A02 -> `node scripts/transferSYT.js 0x7c334f35BF2B4a9e55f60CF3287c885598cF9A02 20`"
* **Balance Tracking:** Use `getSYTBalance.js`. You must report both the nominal sUSDC balance and the underlying USDC value (calculated via the SYT's rebasing logic).
  * Example: "How much sUSDC do I have?" -> `node scripts/getSYTBalance.js`

## Usage Examples
* "Convert 200 USDC into yield tokens."
* "What is my current sUSDC yield accrual?"
* "Send 50 USDC worth of sUSDC to [address]."

## Safety Guardrails
* **Rebase Awareness:** Always clarify that the balance shown is the "claimable underlying assets."