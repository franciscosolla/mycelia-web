import { Keypair } from "@solana/web3.js";
import BIP32Factory from "bip32";
import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import { derivePath } from "ed25519-hd-key";
import * as ecc from "tiny-secp256k1";
import { mnemonicToAccount } from "viem/accounts";

export type ImportedAccounts = {
  ethereum: {
    address: `0x${string}`;
    publicKey: string;
  };
  solana: {
    address: string;
    publicKey: Uint8Array;
  };
  bitcoin: {
    address: string;
    publicKey: Buffer;
  };
};

export const importFromSeedPhrase = async (phrase: string) => {
  console.log({ phrase });

  const seed = await bip39.mnemonicToSeed(phrase); // returns Buffer

  console.log({ seed });

  // -----------------------------------
  // Ethereum
  // -----------------------------------
  const ethAccount = mnemonicToAccount(phrase);

  const ethWalletAddress = ethAccount.address;

  // -----------------------------------
  // Solana
  // -----------------------------------

  const { key } = derivePath("m/44'/501'/0'/0'", seed.toString("hex"));
  const keypair = Keypair.fromSeed(key);

  const solWalletAddress = keypair.publicKey.toString();

  console.log({ solWalletAddress });

  // -----------------------------------
  // Bitcoin — BIP84 (SegWit) m/84'/0'/0'/0/0
  // -----------------------------------
  const bip32 = BIP32Factory(ecc);

  const btcRoot = bip32.fromSeed(seed);

  const btcChild = btcRoot.derivePath("m/84'/0'/0'/0/0");

  const { address: btcWalletAddress } = bitcoin.payments.p2wpkh({
    pubkey: Buffer.from(btcChild.publicKey),
    network: bitcoin.networks.bitcoin, // use bitcoin.networks.testnet for testnet
  });

  console.log({
    ethWalletAddress,
    solWalletAddress,
    btcWalletAddress,
  });
};
