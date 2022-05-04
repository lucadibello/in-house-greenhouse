package com.inhousegreenhouse.ch.backend.model.sensor;

import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.sensor.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.sensor.core.AnalogSensor;
import com.inhousegreenhouse.ch.backend.model.sensor.core.Position;

import java.io.IOException;

/**
 * MoistureSensor defines a moisture sensor.
 */
public class MoistureSensor extends AnalogSensor<Double> {

    /**
     * Constructor for MoistureSensor.
     * @param nameId the name of the sensor.
     * @param sensorPosition the position of the sensor.
     * @param defaultValue the default value of the sensor.
     */
    public MoistureSensor(String nameId, Position sensorPosition, double defaultValue, ADC adc, final int channel) {
        super(nameId, sensorPosition, defaultValue, adc, channel);
    }


    /**
     * Updates the value of the sensor and returns it.
     * @return the value of the sensor.
     * @throws SpiCannotBeInitializedException if the SPI cannot be initialized.
     */
    @Override
    public Double updateAndGet() throws SpiCannotBeInitializedException {
        try {
            this.value = ((1000 - (double) this.getConversionData()) - 300) / 5;
            return this.value;
        } catch (IOException ex) {
           throw new SpiCannotBeInitializedException("SPI cannot be initialized: " + ex.getMessage());
        }
    }
}
