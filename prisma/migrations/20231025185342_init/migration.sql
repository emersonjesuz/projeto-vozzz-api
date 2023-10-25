-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
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
    "id_profile" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_name" TEXT,
    "photo_profile" TEXT,
    "profile_checked" BOOLEAN NOT NULL DEFAULT false,
    "date_tamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" TEXT,
    "description" TEXT,
    "public_likes" INTEGER NOT NULL DEFAULT 0,
    "public_coments" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Publications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userName_key" ON "Profiles"("userName");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publications" ADD CONSTRAINT "Publications_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
