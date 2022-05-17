package com.inhousegreenhouse.ch.backend.model.sensor;

import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.sensor.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.sensor.core.AnalogSensor;
import com.inhousegreenhouse.ch.backend.model.sensor.core.BaseSensor;
import com.inhousegreenhouse.ch.backend.model.sensor.core.Position;

/**
 * WaterSensor class defines the water sensor.
 */
public class WaterSensor extends AnalogSensor<Double> {

    /**
     * Constructor for WaterSensor.
     * @param name name of the sensor.
     * @param defaultValue default value of the sensor.
     * @param adc the AdC object to use to convert analog signal.
     * @param channel the ADC channel where the sensor is connected.
     */
    public WaterSensor(String name, double defaultValue, ADC adc, int channel) {
        super(name, Position.GENERAL, defaultValue, adc, channel);
    }

    /**
     * Updates the value of the sensor and returns it.
     * @return the value of the sensor.
     * @throws SpiCannotBeInitializedException if the SPI cannot be initialized.
     */
    @Override
    public Double updateAndGet() throws SpiCannotBeInitializedException {
        return null;
    }
}
