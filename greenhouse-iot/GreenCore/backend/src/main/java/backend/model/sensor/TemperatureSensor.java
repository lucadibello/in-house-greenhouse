package backend.model.sensor;

/**
 * TemperatureSensor class defines a temperature sensor.
 */
public class TemperatureSensor extends BaseSensor<Double> implements ISensor {

    /**
     * TemperatureSensor constructor.
     * @param name the name of the sensor.
     * @param value the value of the sensor.
     */
    public TemperatureSensor(String name, double value) {
        super(name, Position.GLOBAL, value);
    }
}