package backend.model.sensor;

public class WaterSensor extends BaseSensor<Double> implements ISensor {
    public WaterSensor(String name, double defaultValue) {
        super(name, Position.GLOBAL, defaultValue);
    }
}
