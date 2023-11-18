-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT,
    "birth" TIMESTAMP(3) NOT NULL,
    "password" TEXT,
    "actived" BOOLEAN NOT NULL DEFAULT true,
    "delete" BOOLEAN NOT NULL DEFAULT false,
    "uid" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT,
    "bio" TEXT,
    "photo" TEXT,
    "interests" TEXT[],
    "followers" INTEGER NOT NULL DEFAULT 0,
    "following" INTEGER NOT NULL DEFAULT 0,
    "urlWebsite" TEXT,
    "quizzes" INTEGER NOT NULL DEFAULT 0,
    "holding" INTEGER NOT NULL DEFAULT 0,
    "connection" INTEGER NOT NULL DEFAULT 0,
    "profileChecked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publications" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userName" TEXT,
    "photo" TEXT,
    "profileChecked" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" TEXT,
    "description" TEXT,
    "public_likes" INTEGER NOT NULL DEFAULT 0,
    "public_comments" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Publications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_uid_key" ON "user"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userName_key" ON "Profiles"("userName");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publications" ADD CONSTRAINT "Publications_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
