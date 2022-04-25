package backend.model.sensor;

public class TemperatureSensor extends BaseSensor<Double> implements ISensor {
    public TemperatureSensor(String name, double value) {
        super(name, Position.GLOBAL, value);
    }
}