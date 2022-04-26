package com.inhousegreenhouse.ch.backend.model.sensor;

/**
 * TemperatureSensor class defines a temperature sensor.
 */
public class TemperatureSensor extends BaseSensor<Integer> {

    /**
     * TemperatureSensor constructor.
     * @param name the name of the sensor.
     * @param value the value of the sensor.
     */
    public TemperatureSensor(String name, int value) {
        super(name, Position.GENERAL, value);
    }

    @Override
    public void updateValue() {
        // Set random value between 20 and 40
        this.value = 20 + (int) (Math.random() * ((40 - 20) + 1));
    }
}