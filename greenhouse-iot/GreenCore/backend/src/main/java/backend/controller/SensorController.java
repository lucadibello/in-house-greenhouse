package backend.controller;

import backend.model.sensor.HumiditySensor;
import backend.model.sensor.TemperatureSensor;
import backend.model.sensor.WaterSensor;
import backend.repository.SensorRepository;
import backend.service.SensorService;

import java.util.List;

public class SensorController {

    private SensorService sensorService;

    public SensorController () {
        this.sensorService = new SensorService(new SensorRepository());
    }

    public List<HumiditySensor> getHumiditySensors() {
        return sensorService.getSensors().getHumiditySensors();
    }

    public List<WaterSensor> getWaterSensors() {
        return sensorService.getSensors().getWaterSensors();
    }

    public List<TemperatureSensor> getTemperatureSensors() {
        return sensorService.getSensors().getTemperatureSensors();
    }
}
