-- CreateTable
CREATE TABLE "Position" (
    "position" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("position")
);

-- CreateTable
CREATE TABLE "Type" (
    "code" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "sensor" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "greenhouseId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_position_fkey" FOREIGN KEY ("position") REFERENCES "Position"("position") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_type_fkey" FOREIGN KEY ("type") REFERENCES "Type"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_greenhouseId_fkey" FOREIGN KEY ("greenhouseId") REFERENCES "Greenhouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_sensor_fkey" FOREIGN KEY ("sensor") REFERENCES "Sensor"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
