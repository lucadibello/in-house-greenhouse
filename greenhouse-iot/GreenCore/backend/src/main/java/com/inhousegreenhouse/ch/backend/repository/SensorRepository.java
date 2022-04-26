package com.inhousegreenhouse.ch.backend.repository;

import com.inhousegreenhouse.ch.backend.exception.ProxyRequestFailException;
import com.inhousegreenhouse.ch.backend.exception.RepositoryLoadException;
import com.inhousegreenhouse.ch.backend.model.api.SensorApi;
import com.inhousegreenhouse.ch.backend.model.sensor.*;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;

import java.util.List;

/**
 * Sensor repository that manage all the sensors.
 */
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
     * Greenhouse object
     */
    private final Greenhouse greenhouse;

    public SensorRepository (Greenhouse greenhouse) {
        this.greenhouse = greenhouse;
    }

    /**
     * Load all the sensors from the database
     */
    public void load() throws RepositoryLoadException {
        try {
            // Fetch sensors from the database
            List<ISensor<? extends Number>> sensors = api.getSensors(greenhouse);

            // Check sensor type and add to the correct list
            for (ISensor<? extends Number> sensor : sensors) {
                if (sensor instanceof TemperatureSensor) {
                    greenhouseSensors.addTemperatureSensor((TemperatureSensor) sensor);
                } else if (sensor instanceof HumiditySensor) {
                    greenhouseSensors.addHumiditySensor((HumiditySensor) sensor);
                } else if (sensor instanceof MoistureSensor) {
                    greenhouseSensors.addMoistureSensor((MoistureSensor) sensor);
                }
            }


        } catch (ProxyRequestFailException e) {
            throw new RepositoryLoadException("Failed to load sensors from the database. " + e.getMessage());
        }
    }

    /**
     * Get the loaded sensor list
     * @return SensorList object containing all the sensors
     */
    public SensorList getGreenhouseSensors() {
        return greenhouseSensors;
    }
}
