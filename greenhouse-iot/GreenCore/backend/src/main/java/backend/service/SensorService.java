package backend.service;

import backend.exception.RepositoryLoadException;
import backend.model.sensor.SensorList;
import backend.repository.SensorRepository;

/**
 * Service of Sensor.
 */
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
        } catch (RepositoryLoadException e) {
            // Return empty sensor list
            return null;
        }
    }
}
