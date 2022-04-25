package backend.service;

import backend.exception.ProxyRequestFailException;
import backend.model.sensor.SensorList;
import backend.repository.SensorRepository;

public class SensorService {

    /**
     * Sensor repository.
     */
    private final SensorRepository sensorRepository;

    /**
     * Constructor method
     * @param sensorRepository Sensor repository to use
     */
    public SensorService (SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    /**
     * Get sensor list
     * @return Sensor list
     */
    public SensorList getSensors () {
        try {
            // Load sensors from database
            sensorRepository.load();
            // Return sensor list
            return sensorRepository.getGreenhouseSensors();
        } catch (ProxyRequestFailException e) {
            // Return empty sensor list
            System.err.println("Sensor proxy request failed!");
            return new SensorList();
        }
    }
}
