package com.inhousegreenhouse.ch.backend.model.sensor;

/**
 * WaterSensor class defines the water sensor.
 */
public class WaterSensor extends BaseSensor<Double> {

    /**
     * Constructor for WaterSensor.
     * @param name name of the sensor.
     * @param defaultValue default value of the sensor.
     */
    public WaterSensor(String name, double defaultValue) {
        super(name, Position.GENERAL, defaultValue);
    }

    @Override
    public void updateValue() {
        this.value = Math.random();
    }
}
