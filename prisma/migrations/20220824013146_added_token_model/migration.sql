-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_email_key" ON "Token"("email");
