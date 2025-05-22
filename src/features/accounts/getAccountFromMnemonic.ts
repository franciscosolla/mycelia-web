import { Keypair } from "@solana/web3.js";
import BIP32Factory from "bip32";
import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import { derivePath } from "ed25519-hd-key";
import * as ecc from "tiny-secp256k1";
import { mnemonicToAccount } from "viem/accounts";
import type { BitcoinWallet } from "../wallet/types";
import type { Account } from "./types";

export const getAccountFromMnemonic = (mnemonic: string): Account => {
  return {
    ethereum: mnemonicToAccount(mnemonic).address,
    solana: getSolanaAddressFromMnemonic(mnemonic),
    bitcoin: getBitcointAddressFromMnemonic(
      mnemonic
    ) as BitcoinWallet["address"],
  };
};

const getSolanaAddressFromMnemonic = (mnemonic: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const { key } = derivePath("m/44'/501'/0'/0'", seed.toString("hex"));
  const keypair = Keypair.fromSeed(key);
  return keypair.publicKey.toString();
};

const getBitcointAddressFromMnemonic = (mnemonic: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  const bip32 = BIP32Factory(ecc);

  const btcRoot = bip32.fromSeed(seed);

  const btcChild = btcRoot.derivePath("m/84'/0'/0'/0/0");

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: Buffer.from(btcChild.publicKey),
    network: bitcoin.networks.bitcoin, // use bitcoin.networks.testnet for testnet
  });

  return address;
};
