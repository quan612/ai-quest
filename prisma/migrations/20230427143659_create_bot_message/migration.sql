-- CreateTable
CREATE TABLE "BotMessage" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT DEFAULT '',

    CONSTRAINT "BotMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BotMessage_key_key" ON "BotMessage"("key");
