-- CreateTable
CREATE TABLE "url" (
    "id" INTEGER NOT NULL,
    "longUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "url_longUrl_key" ON "url"("longUrl");
