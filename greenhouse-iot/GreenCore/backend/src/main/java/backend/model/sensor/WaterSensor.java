package backend.model.sensor;

/**
 * WaterSensor class defines the water sensor.
 */
public class WaterSensor extends BaseSensor<Double> implements ISensor {

    /**
     * Constructor for WaterSensor.
     * @param name name of the sensor.
     * @param defaultValue default value of the sensor.
     */
    public WaterSensor(String name, double defaultValue) {
        super(name, Position.GLOBAL, defaultValue);
    }
}
