package com.inhousegreenhouse.ch.backend.service;

import com.inhousegreenhouse.ch.backend.model.sensor.core.SensorList;
import com.inhousegreenhouse.ch.backend.repository.SensorRepository;

/**
 * Service of Sensor.
 */
public class SensorService {

    /**
     * Sensor repository.
     */
    private final SensorRepository sensorRepository;

    /**
     * Constructor method
     * @param sensorRepository Sensor repository to use
     */
    public SensorService (SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    /**
     * Get sensor list
     * @return Sensor list
     */
    public SensorList getSensors () {
        try {
            // Load sensors from database
            sensorRepository.load();
            // Return sensor list
            return sensorRepository.getGreenhouseSensors();
        } catch (Exception e) {
            System.out.println("Error loading sensors from database. Creating an empty list");
            return new SensorList();
        }
    }
}
