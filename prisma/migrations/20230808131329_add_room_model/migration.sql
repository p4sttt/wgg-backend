-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxUsersCount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" DATETIME NOT NULL,
    "lifetime" DATETIME NOT NULL,
    "link" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Room_userId_idx" ON "Room"("userId");
