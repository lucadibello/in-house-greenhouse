package com.inhousegreenhouse.ch.backend.model.sensor;

/**
 * Common interface for all sensors.
 */
public interface ISensor<T extends Number> {
    /**
     * Returns the sensor's value.
     * @return the sensor's value
     */
    T getValue();

    /**
     * Returns the sensor's name.
     * @return the sensor's name
     */
    String getName();

    /**
     * Returns sensor position.
     * @return sensor position
     */
    Position getPosition();

    /**
     * Update sensor's value.
     */
    void updateValue();
}
