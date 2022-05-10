package com.inhousegreenhouse.ch.backend.model.sensor.core;

import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;

/**
 * Common interface for all sensors.
 */
public interface ISensor<T extends Number> {
    /**
     * Returns the sensor's value.
     * @return the sensor's value
     * @throws SpiCannotBeInitializedException if the sensor is not initialized
     */
    T updateAndGet() throws SpiCannotBeInitializedException;

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
     * @return The sensor's value
     */
    T getCachedValue();
}
