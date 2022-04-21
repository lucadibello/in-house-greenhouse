/*
  Warnings:

  - Changed the type of `position` on the `Plant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `position` on the `Sensor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PositionType" AS ENUM ('TOP_LEFT', 'TOP_RIGHT', 'MIDDLE_LEFT', 'MIDDLE_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT', 'GENERAL');

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "position",
ADD COLUMN     "position" "PositionType" NOT NULL;

-- AlterTable
ALTER TABLE "Sensor" DROP COLUMN "position",
ADD COLUMN     "position" "PositionType" NOT NULL;

-- DropEnum
DROP TYPE "Position";

-- CreateTable
CREATE TABLE "Position" (
    "type" "PositionType" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("type")
);
