# 🌿 Mycelia — UI/UX Design Brief

## 🔍 Project Overview

**Mycelia** is a personal Web3 exploration playground and portfolio explorer. It is a mobile-first decentralized application (dApp) focused on enabling users to connect their wallets and explore their blockchain assets in a clean, ergonomic, and intuitive way.

The project is built on:

- **Next.js** (frontend framework)
- **wagmi + viem** (wallet connection and blockchain interaction)
- **WalletConnect v2** (mobile wallet connectivity)

We are laying strong foundations for immediate functionality, while also planning ambitious innovations in decentralized UX for the long term.

## 🔢 Core Objectives for This Design Phase (Mid-Term)

- **Done > Perfect**: Prioritize clean, working designs ready for fast implementation.
- **Mobile-First**: Designs should prioritize smartphones first, with desktop responsiveness secondary.
- **Wallet-Centric Flow**: Connect wallet > view balances > interact simply.
- **Action Ergonomics**: Primary actions should be thumb-reachable (bottom of the screen), especially for mobile.
- **Clear Expansion Paths**: Leave visual space for future additions (NFTs, multi-chain support).

## 🌈 Long-Term Vision (Informing Design Choices)

- Introduce **handedness-aware UX** (right/left thumb optimization for action bars).
- Treat decentralized UX as native-quality, mobile-first experience.
- Offer personalized, sovereign, user-owned experiences in Web3.

We don't need to design this full future now, but current designs should be expandable toward this vision.

## 🔢 Pages & Components Needed

### 1. **Home / Wallet Disconnected State**

- Welcome Message ("Connect your wallet to explore your portfolio.")
- Connect Wallet Button (centered)
- Mobile-first layout

### 2. **Wallet Connected State**

- Top Bar:
  - Mycelia Logo (left)
  - Partial Wallet Address (right, e.g., `0xAbc...123`)
- Main Scroll Area:
  - Total Portfolio Balance (e.g., 2.34 ETH)
  - Token Balances List (simple card-style)
  - NFTs (optional placeholder for now)
- Bottom Action Bar:
  - Primary action ("Send", "Swap" or "Add Asset") aligned to thumb side
  - Secondary action ("Settings")

### 3. **Settings Screen (Simple)**

- Handedness selection:
  - "Right-Handed" (default)
  - "Left-Handed"
- Theme (optional future): Light/Dark

## 🌈 Tone and Visual Style

- **Typography**: Clean, modern sans-serif (Inter, Manrope, or similar)
- **Color Palette**: Organic, natural colors (dark greens, deep blues, earthy tones)
- **Mood**: Calm, futuristic but grounded.
- **Card Design**: Rounded corners, subtle elevation/shadows.
- **Microinteractions**: Smooth taps, simple transitions (no flashy animations).

## 📅 Timeline and Delivery Expectations

- Deliver initial mobile-first Figma mockups:
  - Home screen (Disconnected / Connected)
  - Settings screen
- Desktop responsiveness adaptation (secondary priority)
- Clear component breakdowns for easy frontend integration (Tailwind CSS base preferred).

## 🔗 Additional References

- [Rainbow Wallet UX](https://rainbow.me/)
- [MetaMask Mobile](https://metamask.io/)
- [Uniswap Mobile Interface](https://app.uniswap.org/)

## ✨ Summary

We’re creating a portfolio-centric, mobile-first dApp with strong emphasis on:

- Thumb ergonomics
- Clean decentralized UX
- Expandability toward multi-chain and sovereign Web3 experiences

This first design pass is about **shipping the best basic wallet explorer** — future phases will build toward rethinking Web3 UX.

---

Created and maintained by Francisco Solla — frontend engineer and Web3 UX explorer.
