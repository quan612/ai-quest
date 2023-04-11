-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('PENDING', 'ACTIVE');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "QuestStyle" AS ENUM ('NORMAL', 'FEATURED');

-- CreateEnum
CREATE TYPE "QuestDuration" AS ENUM ('ONGOING', 'LIMITED');

-- CreateTable
CREATE TABLE "WhiteList" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT,
    "twitterId" TEXT DEFAULT '',
    "twitterUserName" TEXT DEFAULT '',
    "userId" TEXT NOT NULL,
    "discordId" TEXT DEFAULT '',
    "discordUserDiscriminator" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nonce" TEXT,
    "uathUser" TEXT DEFAULT '',
    "email" TEXT,
    "password" TEXT DEFAULT '',
    "avatar" TEXT,
    "status" "AccountStatus" DEFAULT 'PENDING',
    "signUpOrigin" TEXT DEFAULT 'Wallet',

    CONSTRAINT "WhiteList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteListUserData" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eth" DECIMAL(10,2) DEFAULT 0,
    "lastEthUpdated" TIMESTAMP(3),
    "followers" INTEGER,
    "lastFollowersUpdated" TIMESTAMP(3),

    CONSTRAINT "WhiteListUserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendingReward" (
    "id" SERIAL NOT NULL,
    "generatedURL" TEXT NOT NULL,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "rewardTypeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "PendingReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "rewardTypeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardType" (
    "id" SERIAL NOT NULL,
    "reward" TEXT NOT NULL,
    "rewardPreview" TEXT,
    "rewardIcon" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RewardType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "QuestType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuest" (
    "id" SERIAL NOT NULL,
    "questId" TEXT NOT NULL,
    "extendedUserQuestData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rewardedQty" INTEGER,
    "rewardedTypeId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "hasClaimed" BOOLEAN NOT NULL DEFAULT false,
    "isClaimable" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserQuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "completedText" TEXT NOT NULL,
    "rewardTypeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT DEFAULT '',
    "extendedQuestData" JSONB,
    "questId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questTypeId" INTEGER NOT NULL,
    "style" "QuestStyle" NOT NULL DEFAULT 'NORMAL',
    "duration" "QuestDuration" NOT NULL DEFAULT 'ONGOING',
    "image" TEXT,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT NOT NULL,
    "nonce" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogError" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "referer" TEXT,
    "userAgent" TEXT,
    "content" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogError_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logRegister" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "referer" TEXT,
    "userAgent" TEXT,
    "wallet" TEXT,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logRegister_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestVariables" (
    "id" SERIAL NOT NULL,
    "vercel_env" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordSecret" TEXT NOT NULL,
    "discordBackend" TEXT NOT NULL,
    "discordBackendSecret" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL,
    "twitterSecret" TEXT NOT NULL,
    "twitterBearerToken" TEXT DEFAULT '',
    "pendingRewardImageUrl" TEXT DEFAULT '',
    "discordBotToken" TEXT DEFAULT '',
    "hostUrl" TEXT DEFAULT '',
    "googleClientEmail" TEXT DEFAULT '',
    "googleClientId" TEXT DEFAULT '',
    "googleProjectId" TEXT DEFAULT '',
    "googlePropertyId" TEXT DEFAULT '',
    "smsSid" TEXT DEFAULT '',
    "smsAuthToken" TEXT DEFAULT '',
    "smsServiceId" TEXT DEFAULT '',
    "requiredSmsVerification" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestVariables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discord" (
    "id" SERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "channel" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "postMessageWhenClaimed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebPushSubscription" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT,
    "auth" TEXT,
    "p256dh" TEXT,

    CONSTRAINT "WebPushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminLogError" (
    "id" SERIAL NOT NULL,
    "route" TEXT,
    "message" TEXT,
    "isSeen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLogError_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigImageHosting" (
    "id" SERIAL NOT NULL,
    "cloudinaryName" TEXT DEFAULT '',
    "cloudinaryKey" TEXT DEFAULT '',
    "cloudinarySecret" TEXT DEFAULT '',
    "generalPreset" TEXT DEFAULT '',
    "avatarPreset" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfigImageHosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeemableTracker" (
    "id" SERIAL NOT NULL,
    "contract" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RedeemableTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigRedeemableContract" (
    "id" SERIAL NOT NULL,
    "contract" TEXT NOT NULL,
    "maxRedeemable" INTEGER NOT NULL DEFAULT 0,
    "totalRedeemable" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image" TEXT DEFAULT '',
    "nftType" TEXT DEFAULT '',
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "contractAbi" JSONB,

    CONSTRAINT "ConfigRedeemableContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeemRequirement" (
    "id" SERIAL NOT NULL,
    "requirementId" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT '',
    "relationId" INTEGER NOT NULL,
    "conditional" JSONB,
    "redeemId" INTEGER,

    CONSTRAINT "RedeemRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhiteList_wallet_key" ON "WhiteList"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteList_userId_key" ON "WhiteList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteList_email_key" ON "WhiteList"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteListUserData_userId_key" ON "WhiteListUserData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PendingReward_userId_rewardTypeId_generatedURL_key" ON "PendingReward"("userId", "rewardTypeId", "generatedURL");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_userId_rewardTypeId_key" ON "Reward"("userId", "rewardTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "RewardType_reward_key" ON "RewardType"("reward");

-- CreateIndex
CREATE UNIQUE INDEX "QuestType_name_key" ON "QuestType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserQuest_userId_questId_key" ON "UserQuest"("userId", "questId");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_questId_key" ON "Quest"("questId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_wallet_key" ON "Admin"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "Discord_channelId_key" ON "Discord"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "RedeemableTracker_userId_key" ON "RedeemableTracker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RedeemableTracker_userId_contract_key" ON "RedeemableTracker"("userId", "contract");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigRedeemableContract_contract_key" ON "ConfigRedeemableContract"("contract");

-- CreateIndex
CREATE UNIQUE INDEX "RedeemRequirement_requirementId_key" ON "RedeemRequirement"("requirementId");

-- AddForeignKey
ALTER TABLE "WhiteListUserData" ADD CONSTRAINT "WhiteListUserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WhiteList"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingReward" ADD CONSTRAINT "PendingReward_rewardTypeId_fkey" FOREIGN KEY ("rewardTypeId") REFERENCES "RewardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingReward" ADD CONSTRAINT "PendingReward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WhiteList"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_rewardTypeId_fkey" FOREIGN KEY ("rewardTypeId") REFERENCES "RewardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WhiteList"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuest" ADD CONSTRAINT "UserQuest_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("questId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuest" ADD CONSTRAINT "UserQuest_rewardedTypeId_fkey" FOREIGN KEY ("rewardedTypeId") REFERENCES "RewardType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuest" ADD CONSTRAINT "UserQuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WhiteList"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_questTypeId_fkey" FOREIGN KEY ("questTypeId") REFERENCES "QuestType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_rewardTypeId_fkey" FOREIGN KEY ("rewardTypeId") REFERENCES "RewardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeemableTracker" ADD CONSTRAINT "RedeemableTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WhiteList"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeemRequirement" ADD CONSTRAINT "RedeemRequirement_redeemId_fkey" FOREIGN KEY ("redeemId") REFERENCES "ConfigRedeemableContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
