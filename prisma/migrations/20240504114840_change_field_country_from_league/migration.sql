/*
  Warnings:

  - You are about to drop the column `countryId` on the `League` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "League" DROP CONSTRAINT "League_countryId_fkey";

-- AlterTable
ALTER TABLE "League" DROP COLUMN "countryId",
ADD COLUMN     "country" TEXT;
