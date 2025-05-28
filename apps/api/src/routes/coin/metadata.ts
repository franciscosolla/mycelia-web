import { Alchemy, Network } from "alchemy-sdk";
import express from "express";

const router = express.Router();

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

router.get("/metadata/:address", async (req, res) => {
  const address = req.params.address;

  try {
    const metadata = await alchemy.core.getTokenMetadata(address);
    res.status(200).json(metadata);
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    res.status(500).json({ error: "Failed to fetch token metadata" });
  }
});

export default router;
