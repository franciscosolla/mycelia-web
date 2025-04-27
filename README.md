# 🌿 Mycelia

[Live Project → https://mycelia.solla.dev](https://mycelia.solla.dev)

**Mycelia** is my personal Web3 exploration playground — a decentralized application (dApp) sandbox built with modern frontend technologies and evolving Web3 standards.

It’s a space where I experiment with blockchain concepts, wallet connections, decentralized interactions, and multi-chain possibilities — starting with the Ethereum ecosystem and expanding progressively.

> Like a mycelial network, this project will organically expand across chains, technologies, and ideas.

---

## 🚀 Tech Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/)
- **Styling:** Tailwind CSS (planned for future UI iterations)
- **State Management & Blockchain Interaction:** [wagmi](https://wagmi.sh/) + [viem](https://viem.sh/)
- **Wallet Connections:**
  - Injected wallets (MetaMask, Brave, etc.)
  - WalletConnect v2 (mobile wallets like Rainbow, Trust, MetaMask Mobile)
- **Blockchain Ecosystem (Phase 1):**
  - Ethereum Mainnet
- **Hosting & Deployment:** [Vercel](https://vercel.com/)
- **Version Control:** [GitHub](https://github.com/franciscosolla/mycelia)

---

## 🧀 Project Vision

**Mycelia** is intended to be a continuously evolving project:

- **Start:** Connecting wallets, handling wallet sessions, chain detection.
- **Next:** Interacting with smart contracts (reading/writing).
- **Later:** Expanding multi-chain support beyond EVM (e.g., Solana, Cosmos).
- **End Goal:** Build a clean, modular, open-ended Web3 playground that can serve as a strong professional showcase of decentralized frontend engineering best practices.

---

## 📋 Project Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local` file

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-walletconnect-cloud-project-id
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 🎯 Development Principles

- **Minimal abstractions first**, polish UX incrementally.
- **Decentralization-first thinking**: wallet connections, self-custody, multi-network support.
- **Professional code quality**: strongly typed, testable, clean separation of concerns.
- **Learning and exploration-driven**: Mycelia will evolve based on my interests and Web3 frontier developments.

---

## 📖 Roadmap (Next Steps)

- [ ] Add ENS name resolution and avatar fetch
- [ ] Support custom network switching
- [ ] Implement smart contract read operations
- [ ] Add cross-chain metadata fetching (NFTs, tokens)
- [ ] Later: Introduce Solana wallet connection flow

---

## ✨ About

Created and maintained by [Francisco Solla](https://linkedin.com/in/francisco-solla).

Mycelia is a continuous exploration into the principles of decentralization, user sovereignty, and the evolving decentralized web.
