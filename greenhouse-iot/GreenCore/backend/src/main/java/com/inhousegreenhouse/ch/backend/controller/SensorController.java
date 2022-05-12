package com.inhousegreenhouse.ch.backend.controller;

import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.sensor.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.sensor.core.AnalogSensor;
import com.inhousegreenhouse.ch.backend.model.sensor.core.SensorList;
import com.inhousegreenhouse.ch.backend.model.sensor.core.SensorType;
import com.inhousegreenhouse.ch.backend.model.util.Channels;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.repository.SensorRepository;
import com.inhousegreenhouse.ch.backend.service.SensorService;

import java.io.IOException;
import java.util.Properties;

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
    public SensorController (Greenhouse greenhouse, Properties settings) throws SpiCannotBeInitializedException {
        try {
            // Initialize the SPI interface
            ADC adc = new ADC();

            // Clear channels
            AnalogSensor.channels.clear();

            // Register the sensors inside the channel manager
            AnalogSensor.channels.registerSensor(SensorType.SOIL_MOISTURE, 0, 5);
            AnalogSensor.channels.registerSensor(SensorType.HUMIDITY, 6, 6);
            AnalogSensor.channels.registerSensor(SensorType.TEMPERATURE, 7, 7);

            // Build proxy url from properties using host and port
            String proxyUrl = "http://" + settings.getProperty("greencore.proxy.host") + ":" + settings.getProperty("greencore.proxy.port") + settings.getProperty("greencore.proxy.route");

            // Initialize the sensor service
            this.sensorService = new SensorService(new SensorRepository(greenhouse, adc, proxyUrl));
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
