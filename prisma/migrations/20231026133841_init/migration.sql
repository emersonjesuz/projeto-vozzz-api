/*
  Warnings:

  - You are about to drop the column `id_profile` on the `Publications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Publications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Publications" DROP CONSTRAINT "Publications_id_profile_fkey";

-- AlterTable
ALTER TABLE "Publications" DROP COLUMN "id_profile",
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "uid" INTEGER,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_uid_key" ON "user"("uid");

-- AddForeignKey
ALTER TABLE "Publications" ADD CONSTRAINT "Publications_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
