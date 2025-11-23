/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - Added the required column `tag` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AddressTag" AS ENUM ('HOME', 'OFFICE', 'WORK');

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_addressId_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "tag" "AddressTag" NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "addressId" DROP NOT NULL,
ALTER COLUMN "totalAmount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "subCategory" TEXT,
ALTER COLUMN "stock" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
