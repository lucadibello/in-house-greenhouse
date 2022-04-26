package com.inhousegreenhouse.ch.backend.model.sensor;

/**
 * HumiditySensor class that defines the humidity sensor.
 */
public class HumiditySensor extends BaseSensor<Double> {
    /**
     * Constructor for the HumiditySensor class.
     * @param name the name of the sensor.
     * @param defaultValue the default value of the sensor.
     */
    public HumiditySensor(String name, double defaultValue) {
        super(name, Position.GENERAL,defaultValue);
    }

    @Override
    public void updateValue() {
        this.value = Math.random();
    }
}
