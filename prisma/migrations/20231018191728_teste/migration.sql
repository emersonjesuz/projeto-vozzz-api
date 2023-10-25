-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_name" TEXT,
    "bio" TEXT,
    "photo" TEXT,
    "interests" TEXT,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "following" INTEGER NOT NULL DEFAULT 0,
    "url_website" TEXT,
    "quizzes" INTEGER NOT NULL DEFAULT 0,
    "holding" INTEGER NOT NULL DEFAULT 0,
    "connection" INTEGER NOT NULL DEFAULT 0,
    "profile_checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
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

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_name_key" ON "Profile"("user_name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
