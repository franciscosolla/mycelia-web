-- CreateEnum
CREATE TYPE "Chain" AS ENUM ('bitcoin', 'ethereum', 'solana');

-- CreateTable
CREATE TABLE "CoinMetadata" (
    "chain" "Chain" NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoinMetadata_pkey" PRIMARY KEY ("chain","address")
);

-- CreateIndex
CREATE INDEX "CoinMetadata_chain_idx" ON "CoinMetadata"("chain");
