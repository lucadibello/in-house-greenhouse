-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_position_fkey" FOREIGN KEY ("position") REFERENCES "Position"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_position_fkey" FOREIGN KEY ("position") REFERENCES "Position"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
