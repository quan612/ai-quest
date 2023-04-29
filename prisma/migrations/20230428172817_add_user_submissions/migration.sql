/*
  Warnings:

  - You are about to drop the `ConfigRedeemableContract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RedeemRequirement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RedeemableTracker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RedeemRequirement" DROP CONSTRAINT "RedeemRequirement_redeemId_fkey";

-- DropForeignKey
ALTER TABLE "RedeemableTracker" DROP CONSTRAINT "RedeemableTracker_userId_fkey";

-- AlterTable
ALTER TABLE "PendingReward" ADD COLUMN     "wallet" TEXT;

-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "wallet" TEXT;

-- DropTable
DROP TABLE "ConfigRedeemableContract";

-- DropTable
DROP TABLE "RedeemRequirement";

-- DropTable
DROP TABLE "RedeemableTracker";

-- CreateTable
CREATE TABLE "MoralisNftData" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "contractData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoralisNftData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shellRedeemed" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT,
    "rewards" TEXT[],
    "rewardPointer" INTEGER NOT NULL DEFAULT -1,
    "isRedeemed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "shellRedeemed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmsVerification" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "attemptedPhone" TEXT NOT NULL,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "valid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SmsVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubmission" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "submissions" JSONB,

    CONSTRAINT "UserSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoralisNftData_contractAddress_key" ON "MoralisNftData"("contractAddress");

-- CreateIndex
CREATE UNIQUE INDEX "shellRedeemed_wallet_key" ON "shellRedeemed"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "shellRedeemed_userId_key" ON "shellRedeemed"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SmsVerification_userId_key" ON "SmsVerification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SmsVerification_attemptedPhone_key" ON "SmsVerification"("attemptedPhone");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubmission_userId_key" ON "UserSubmission"("userId");

-- AddForeignKey
ALTER TABLE "SmsVerification" ADD CONSTRAINT "SmsVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WhiteList"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubmission" ADD CONSTRAINT "UserSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WhiteList"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
