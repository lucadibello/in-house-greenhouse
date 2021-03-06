package com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core;

/**
 * BaseSensor is the base class for all sensors.
 * @param <T> The type of data the sensor detects.
 */
public abstract class BaseSensor<T extends Number> implements ISensor<T> {
    /**
     * Value held by the sensor.
     */
    public T value;

    /**
     * Sensor unique name (ID).
     */
    public final String SENSOR_NAME;

    /**
     * Sensor position inside the greenhouse.
     */
    public final Position POSITION;

    /**
     * Flag indicating if the sensor is active.
     */
    public boolean isEnabled = true;

    /**
     * Set the sensor value.
      * @param nameId The sensor name.
     * @param sensorPosition The sensor position inside the greenhouse.
     * @param defaultValue The sensor default value.
     */
    public BaseSensor(String nameId, Position sensorPosition, T defaultValue) {
        this.value = defaultValue;
        this.SENSOR_NAME = nameId;
        this.POSITION = sensorPosition;
    }

    /**
     * Get the sensor name.
     * @return The sensor name.
     */
    public String getName() {
        return SENSOR_NAME;
    }

    /**
     * Get the sensor position.
     * @return The sensor position.
     */
    public Position getPosition() {
        return POSITION;
    }

    /**
     * Get the sensor value.
     * @return The sensor value.
     */
    public T getCachedValue() {
        return value;
    }

    /**
     * Check if the sensor is currently enabled.
     * @return True if the sensor is enabled, false otherwise.
     */
    public boolean isEnabled() {
        return isEnabled;
    }

    /**
     * Set the sensor enabled status.
     * @param state The new status.
     */
    public void setEnabled(boolean state) {
        this.isEnabled = state;
    }
}
