/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "actived" BOOLEAN NOT NULL DEFAULT true,
    "delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "interests" TEXT[],
    "followers" INTEGER NOT NULL DEFAULT 0,
    "following" INTEGER NOT NULL DEFAULT 0,
    "urlWebsite" TEXT NOT NULL,
    "quizzes" INTEGER NOT NULL DEFAULT 0,
    "holding" INTEGER NOT NULL DEFAULT 0,
    "connection" INTEGER NOT NULL DEFAULT 0,
    "profileChecked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userName_key" ON "Profiles"("userName");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
