package backend.repository;

import backend.exception.ProxyRequestFailException;
import backend.model.api.SensorApi;
import backend.model.sensor.*;

public class SensorRepository implements IRepository {

    /**
     * SensorList data structure that will contain all the sensors divided per type.
     */
    private final SensorList greenhouseSensors = new SensorList();


    /**
     * Sensor API object
     */
    private final SensorApi api = new SensorApi();

    /**
     * Load all the sensors from the database
     */
    public void load() throws ProxyRequestFailException {
        // Fetch sensors from the database
        api.getSensors().forEach(System.out::println);

        // FIXME: DATA WILL BE LOADED FROM API INSTEAD

        /*
            // Add humidity sensor
            greenhouseSensors.addHumiditySensor(new HumiditySensor("HUMIDITY", 0));

            // Add all temperature sensors
            greenhouseSensors.addTemperatureSensor(new TemperatureSensor("TEMPERATURE", 0));

            // Add all water sensors
            greenhouseSensors.addWaterSensor(new WaterSensor("WATER", 0));

            // Add all moisture sensors
            greenhouseSensors.addMoistureSensor(new MoistureSensor("MOISTURE", Position.TOP_LEFT, 0));
            greenhouseSensors.addMoistureSensor(new MoistureSensor("MOISTURE", Position.TOP_RIGHT, 0));
            greenhouseSensors.addMoistureSensor(new MoistureSensor("MOISTURE", Position.MIDDLE_LEFT, 0));
            greenhouseSensors.addMoistureSensor(new MoistureSensor("MOISTURE", Position.MIDDLE_RIGHT, 0));
            greenhouseSensors.addMoistureSensor(new MoistureSensor("MOISTURE", Position.BOTTOM_LEFT, 0));
            greenhouseSensors.addMoistureSensor(new MoistureSensor("MOISTURE", Position.BOTTOM_RIGHT, 0));
        */
    }

    /**
     * Get the loaded sensor list
     * @return SensorList object containing all the sensors
     */
    public SensorList getGreenhouseSensors() {
        return greenhouseSensors;
    }
}
