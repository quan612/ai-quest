-- CreateTable
CREATE TABLE "AppState" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "expired" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppState_name_key" ON "AppState"("name");
