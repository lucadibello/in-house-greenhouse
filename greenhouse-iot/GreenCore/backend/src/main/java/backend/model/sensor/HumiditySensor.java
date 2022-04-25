package backend.model.sensor;

public class HumiditySensor extends BaseSensor<Double> implements ISensor {
    public HumiditySensor(String name, double defaultValue) {
        super(name, Position.GLOBAL ,defaultValue);
    }
}
