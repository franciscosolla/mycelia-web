# 🌿 Mycelia

[![Version](https://img.shields.io/badge/version-0.5.0-purple)](https://github.com/franciscosolla/mycelia-web)
[![License](https://img.shields.io/github/license/franciscosolla/mycelia-web?color=blue)](LICENSE)
[![Live App](https://img.shields.io/badge/demo-live-success)](https://mycelia.solla.dev)
[![Design System](https://img.shields.io/badge/design-Figma-blueviolet)](https://www.figma.com/design/cdSqctVxKmW6ujcba09bzt/Mycelia?node-id=0-1&p=f&t=AX5JHTBaMtKcPEt4-0)

> A modular, self-custodial, multi-chain, multi-account crypto wallet built to empower users through design.

---

## 🧠 Project Objective

Mycelia is a dApp playground, and it is becoming a complete self-custodial wallet.

- **Multi-chain**: Ethereum, Solana, Bitcoin and others coming soon.
- **Multi-account**: Multiple user accounts, each containing multiple wallets across networks.
- **Account types**:
  - **Owned**: Generated from a saved mnemonic passphrase (fully controlled, secure).
  - **Watched**: Imported by manually entering addresses, used for observation only.
  - **Connected**: Temporarily linked via WalletConnect or browser extensions like MetaMask, usable for signing.

The user experience is designed to be:

- **Visually bold**, prioritizing clarity and flow.
- **Ergonomic**: All controls and interactions are designed to fall within thumb reach (initially for right-handed users, left-hand mode planned).
- **Exploratory**: Users can seamlessly navigate NFTs, coins, transactions, DeFi positions, and cross-chain balances in a single interface.

> Design System: [Figma](https://www.figma.com/design/cdSqctVxKmW6ujcba09bzt/Mycelia?node-id=0-1&p=f&t=AX5JHTBaMtKcPEt4-0)

### Preview

| Current                                                                                                    | Direction                                                                                                 |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![Mycelia Current Design](https://github.com/user-attachments/assets/52ace6c4-6ff2-428f-8b1d-85dc001522ff) | ![Mycelia Vision Design](https://github.com/user-attachments/assets/e91e32a5-7968-4120-9978-2e28df2b55f5) |

---

## 🔍 Key Abstractions

### `Account`

An **Account** represents a user-defined identity. Owned accounts contain multiple wallets derived from the same mnemonic phrase. Watched and connected accounts may include various manually added or linked wallets across networks, but their origin cannot be verified.

### `Coin`

A **Coin** represents any crypto asset that is fungible and traded. This includes:

- Layer 1 tokens (e.g. ETH, SOL, BTC)
- ERC-20 and SPL tokens
- L2 bridged tokens (e.g. ARB, OP)

Coins are treated uniformly across accounts and networks.

---

## 🚀 Tech Stack

### Frontend (Web App)

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** Tailwind CSS
- **State:** Zustand, [TanStack Query](https://tanstack.com/query), wagmi
- **Chain integration:** viem, @solana/web3.js, bitcoinjs-lib
- **Wallet Connectivity:**
  - Injected wallets (MetaMask, Phantom)
  - WalletConnect v2
- **Data Sources:**
  - [Alchemy](https://www.alchemy.com/) — tokens, balances, NFTs, metadata
  - [DeFiLlama](https://defillama.com/) — token prices
  - [TrustWallet Assets](https://github.com/trustwallet/assets) — logos
- **Deployment:** Vercel (Web)

### Backend (API Server)

- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** PostgreSQL (via Prisma ORM)
- **API Features:**
  - `/coin/metadata/:address` endpoint with local DB caching
  - Alchemy fallback for metadata
  - Modular routes (per domain, eg: `/coin`, `/nft`, `/account`)
- **Deployment:** Railway (API & DB)

---

## ✅ Current Capabilities

- Import account through 12 word mnemonic phrase
- Display token balances and prices in real time
- Fetch and cache token metadata via custom backend API

---

## 📁 Folder Structure (Monorepo)

```
mycelia/
├── apps/
│   ├── web/             # Next.js frontend
│   └── api/             # Express backend
├── packages/            # Future shared libs (e.g. utils, constants)
├── prisma/              # Schema and migrations
├── .turbo/              # Turborepo cache
├── turbo.json           # Monorepo config
```

---

## 💻 Setup Instructions

### 1. Clone the monorepo

```bash
git clone https://github.com/franciscosolla/mycelia-web.git
cd mycelia-web
```

### 2. Install all dependencies

```bash
npm install
```

### 3. Create required `.env` files

#### apps/web/.env

```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your-alchemy-key
NEXT_PUBLIC_REOWN_PROJECT_ID=your-reown-project-id
```

#### apps/api/.env

```env
ALCHEMY_API_KEY=your-alchemy-key
DATABASE_URL=your-postgre-db-public-url
```

### 4. Setup database with Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run both apps (web + api)

```bash
npx turbo run dev
```

Open:

- Web: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:4000](http://localhost:4000)

---

## 🎨 Design System (WIP)

- Mobile-first
- Right-handed ergonomics

> 📐 The system is evolving on Figma:  
> [Mycelia Design File](https://www.figma.com/design/cdSqctVxKmW6ujcba09bzt/Mycelia?node-id=14-530&t=73oiTJGYXCCJzUfY-1)

---

## ✨ About

Created and maintained by [Francisco Solla](https://solla.dev).

Mycelia is a long-term exploration of dApp design.
