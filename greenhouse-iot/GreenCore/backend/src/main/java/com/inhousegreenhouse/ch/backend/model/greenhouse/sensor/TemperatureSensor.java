package com.inhousegreenhouse.ch.backend.model.greenhouse.sensor;

import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.greenhouse.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.AnalogSensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.Position;

/**
 * TemperatureSensor class defines a temperature sensor.
 */
public class TemperatureSensor extends AnalogSensor<Double> {

    /**
     * TemperatureSensor constructor.
     * @param name the name of the sensor.
     * @param value the value of the sensor.
     * @param adc the AdC object to use to convert analog signal.
     * @param channel the ADC channel where the sensor is connected.
     */
    public TemperatureSensor(String name, double value, ADC adc, int channel) {
        super(name, Position.GENERAL, value, adc, channel);
    }

    /**
     * Update the cached value of the sensor and return it.
     * @return the new value of the sensor.
     * @throws SpiCannotBeInitializedException if the SPI cannot be initialized.
     */
    @Override
    public Double updateAndGet() throws SpiCannotBeInitializedException {
        return null;
    }
}