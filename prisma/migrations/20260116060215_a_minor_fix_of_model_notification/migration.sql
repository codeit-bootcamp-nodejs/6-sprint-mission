-- DropIndex
DROP INDEX "Notification_userId_createdAt_key";

-- DropIndex
DROP INDEX "Notification_userId_isRead_key";

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");
