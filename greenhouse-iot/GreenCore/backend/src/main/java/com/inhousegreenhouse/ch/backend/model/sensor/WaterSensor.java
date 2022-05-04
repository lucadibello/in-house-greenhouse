package com.inhousegreenhouse.ch.backend.model.sensor;

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
     * @param adc ADC object.
     * @param channel ADC channel where the sensor is connected to.
     */
    public WaterSensor(String name, double defaultValue, ADC adc, int channel) {
        super(name, Position.GENERAL, defaultValue, adc, channel);
    }

    @Override
    public Double updateAndGet() {
        this.value = Math.random();
        return null;
    }
}
