package com.inhousegreenhouse.ch.backend.model.sensor;

/**
 * MoistureSensor defines a moisture sensor.
 */
public class MoistureSensor extends BaseSensor<Double> {

    /**
     * Constructor for MoistureSensor.
     * @param nameId the name of the sensor.
     * @param sensorPosition the position of the sensor.
     * @param defaultValue the default value of the sensor.
     */
    public MoistureSensor(String nameId, Position sensorPosition, double defaultValue) {
        super(nameId, sensorPosition, defaultValue);
    }

    @Override
    public void updateValue() {
        this.value = Math.random();
    }
}
