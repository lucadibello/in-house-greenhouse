package backend.model.sensor;

/**
 * HumiditySensor class that defines the humidity sensor.
 */
public class HumiditySensor extends BaseSensor<Double> implements ISensor {
    /**
     * Constructor for the HumiditySensor class.
     * @param name the name of the sensor.
     * @param defaultValue the default value of the sensor.
     */
    public HumiditySensor(String name, double defaultValue) {
        super(name, Position.GLOBAL ,defaultValue);
    }
}
