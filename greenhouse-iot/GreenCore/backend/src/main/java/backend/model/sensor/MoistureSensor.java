package backend.model.sensor;

/**
 * MoistureSensor defines a moisture sensor.
 */
public class MoistureSensor extends BaseSensor<Double> implements ISensor {

    /**
     * Constructor for MoistureSensor.
     * @param nameId the name of the sensor.
     * @param sensorPosition the position of the sensor.
     * @param defaultValue the default value of the sensor.
     */
    public MoistureSensor(String nameId, Position sensorPosition, double defaultValue) {
        super(nameId, sensorPosition, defaultValue);
    }
}
