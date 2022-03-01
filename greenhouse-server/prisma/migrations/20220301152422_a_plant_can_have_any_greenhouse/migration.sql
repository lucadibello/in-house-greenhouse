-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_greenhouseId_fkey";

-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "greenhouseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_greenhouseId_fkey" FOREIGN KEY ("greenhouseId") REFERENCES "Greenhouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
