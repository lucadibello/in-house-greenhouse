package com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core;

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

    /**
     * Return sensor channel
     * @return sensor channel
     */
    int getChannel();

    /**
     * Flag indicating whether the sensor is enabled.
     * @return true if the sensor is enabled, false otherwise
     */
    boolean isEnabled();

    /**
     * Change sensor's state.
     * @param enabled true if the sensor is enabled, false otherwise
     */
    void setEnabled(boolean enabled);
}
