-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "importance" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "task" TEXT NOT NULL,
    "limitTime" TEXT NOT NULL
);
INSERT INTO "new_Task" ("date", "id", "importance", "limitTime", "task", "title") SELECT "date", "id", "importance", "limitTime", "task", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
