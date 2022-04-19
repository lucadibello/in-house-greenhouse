/*
  Warnings:

  - You are about to drop the column `position` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Sensor` table. All the data in the column will be lost.
  - Added the required column `positionType` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionType` to the `Sensor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_position_fkey";

-- DropForeignKey
ALTER TABLE "Sensor" DROP CONSTRAINT "Sensor_position_fkey";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "position",
ADD COLUMN     "positionType" "PositionType" NOT NULL;

-- AlterTable
ALTER TABLE "Sensor" DROP COLUMN "position",
ADD COLUMN     "positionType" "PositionType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_positionType_fkey" FOREIGN KEY ("positionType") REFERENCES "Position"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_positionType_fkey" FOREIGN KEY ("positionType") REFERENCES "Position"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
