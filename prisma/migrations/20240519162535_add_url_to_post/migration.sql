/*
  Warnings:

  - You are about to drop the column `slug` on the `Post` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "slug",
ADD COLUMN     "summary" TEXT NOT NULL;
