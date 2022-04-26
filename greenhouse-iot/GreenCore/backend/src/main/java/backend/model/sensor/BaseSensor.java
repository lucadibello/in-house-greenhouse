package backend.model.sensor;

/**
 * BaseSensor is the base class for all sensors.
 * @param <T> The type of data the sensor detects.
 */
public abstract class BaseSensor<T> {
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
     * Get the sensor saved value
     * @return The sensor value
     */
    public T getValue() {
        return value;
    }
}
