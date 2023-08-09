-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "maxUsersCount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" DATETIME,
    "link" TEXT
);
INSERT INTO "new_Room" ("createdAt", "deleteAt", "id", "link", "maxUsersCount", "name", "userId") SELECT "createdAt", "deleteAt", "id", "link", "maxUsersCount", "name", "userId" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE INDEX "Room_userId_idx" ON "Room"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
