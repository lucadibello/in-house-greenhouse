/*
  Warnings:

  - Added the required column `position` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "position" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_position_fkey" FOREIGN KEY ("position") REFERENCES "Position"("position") ON DELETE RESTRICT ON UPDATE CASCADE;
