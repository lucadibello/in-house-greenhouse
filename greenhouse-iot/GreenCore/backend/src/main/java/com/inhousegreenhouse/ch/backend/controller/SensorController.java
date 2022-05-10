package com.inhousegreenhouse.ch.backend.controller;

import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.sensor.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.sensor.core.SensorList;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.repository.SensorRepository;
import com.inhousegreenhouse.ch.backend.service.SensorService;

import java.io.IOException;

/**
 * Controller for the sensors.
 */
public class SensorController {

    /**
     * Service for the sensors. Used to execute operations on the sensors.
     */
    private final SensorService sensorService;

    /**
     * Constructor.
     * @param greenhouse Greenhouse where the sensors are attached.
     * @throws SpiCannotBeInitializedException If the SPI interface, needed to read the sensors, cannot be initialized.
     */
    public SensorController (Greenhouse greenhouse) throws SpiCannotBeInitializedException {
        try {
            ADC adc = new ADC();
            this.sensorService = new SensorService(new SensorRepository(greenhouse, adc));
        } catch (IOException e) {
            throw new SpiCannotBeInitializedException("SPI cannot be initialized: " + e.getMessage());
        }
    }

    /**
     * Get the list of available sensors.
     * @return List of sensors as a SensorList object.
     */
    public SensorList getSensors () {
        return sensorService.getSensors();
    }
}
