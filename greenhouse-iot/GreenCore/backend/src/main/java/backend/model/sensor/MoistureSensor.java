package backend.model.sensor;

public class MoistureSensor extends BaseSensor<Double> implements ISensor {
    public MoistureSensor(String nameId, Position sensorPosition, double defaultValue) {
        super(nameId, sensorPosition, defaultValue);
    }
}
