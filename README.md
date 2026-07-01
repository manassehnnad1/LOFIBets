<img width="3815" height="1810" alt="image" src="https://github.com/user-attachments/assets/6adc4a6c-af83-497d-a5c6-42869d57f798" />

_Trade markets directly on SUI_

# LOFIBets

A pool-based (parimutuel) prediction market built on Sui Network for the **CLAY (Code Like A Yeti) Hackathon**. Bet on anything from the 2026 World Cup to $LOFI price action, settled trustlessly on-chain.

**Live demo:** https://lofibets.vercel.app/
**Demo video:** https://youtu.be/MLxRpoIav3k?si=xjE7dD16luwbZMRC

---

## What it does

LOFIBets lets users bet on binary outcomes — YES or NO — by depositing SUI into a shared liquidity pool. When a market resolves, the entire losing pool is swept into the winning pool, and winners claim their share proportionally based on how much they staked.

```
payout = (your stake / total winning pool) × total combined pool
```

No order books, no price slippage, no complexity — just a pool, a question, and an outcome.

---

## Why parimutuel

Order-book prediction markets (like Polymarket) require deep liquidity and market makers to function well. A parimutuel pool needs neither — it works from the very first bet, which makes it ideal for a community-driven market like this one, where liquidity starts at zero and grows with engagement.

---

## Built on the Sui Stack

**Sui Network** — the entire market lifecycle (creation, betting, resolution, payout) is handled by a single Move module deployed on testnet. Every bet mints an on-chain `BetReceipt` object directly into the user's wallet — verifiable, ownable proof of every position.

**Walrus** — rich market metadata (question text, category, images) is stored as a Walrus blob rather than on-chain, keeping the Move objects lightweight. Only the blob ID is stored in the `Market` struct; the frontend resolves the rest from Walrus.

**DeepBook** — the contract is designed so that any Sui-native coin can be routed through DeepBook and swapped into the pool's native asset within a single Programmable Transaction Block. This means a user holding only SUI, USDC, or any other DeepBook-listed asset can participate without a separate manual swap. *(Wired in code; not live-demoed due to testnet liquidity constraints — see Known Limitations.)*

---

## Smart contract

The core module, `yetibets.move`, defines:

| Object | Description |
|---|---|
| `AdminCap` | Capability object held by the deployer, required to create and resolve markets |
| `Market` | Shared object holding the YES/NO pools, status, winner, and Walrus blob ID |
| `BetReceipt` | Owned object minted to a bettor's wallet, proof of stake and choice |

| Function | Description |
|---|---|
| `create_market` | Admin opens a new market with a question and Walrus blob ID |
| `place_bet` | User deposits SUI into the YES or NO pool, receives a `BetReceipt` |
| `resolve_market` | Admin declares the winning side, closing the market to new bets |
| `claim_winnings` | Winner burns their receipt and receives a proportional payout |

---

## Frontend

React + TypeScript + Tailwind, wired to the contract via `@mysten/dapp-kit`.

- **Markets** — live pool data, YES/NO split visualized as a progress bar, category filters
- **Bet flow** — connect wallet, choose YES or NO, place a bet, all in one modal
- **My Bets** — every `BetReceipt` owned by the connected wallet, with a claim flow for resolved winning positions
- **PnL card** — a shareable result card generated on claim, showing stake, payout, and profit

---

## Known limitations & what's next

This was built end-to-end in under a week for the hackathon, with a few deliberate scope cuts:

- **Betting asset is testnet SUI**, not the live $SUI token — mainnet $SUI integration is a one-line type change once deployed there
- **Market resolution is manual** (admin-called) rather than oracle-driven — Pyth Network integration is the natural next step for trustless, automated settlement
- **DeepBook swap path is implemented in the contract design** but not demoed live, since a SUI/LOFI liquidity pool doesn't yet exist on testnet
- **No protocol fee** — 100% of the losing pool currently flows to winners; a small fee mechanism would make this production-viable

---

This is an early build. I'm actively shipping improvements (Contract, Interface, flow, etc) and would love the opportunity to take LOFIBets further with grant support from the Sui ecosystem as I see this getting really big for LOFI and the SUI eco at large.

