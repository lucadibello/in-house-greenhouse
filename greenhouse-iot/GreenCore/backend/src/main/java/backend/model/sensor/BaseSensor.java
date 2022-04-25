package backend.model.sensor;

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
     * Constructor.
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
