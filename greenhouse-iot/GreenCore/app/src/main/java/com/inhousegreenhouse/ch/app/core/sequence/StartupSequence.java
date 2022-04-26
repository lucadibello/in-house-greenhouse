package com.inhousegreenhouse.ch.app.core.sequence;

import com.inhousegreenhouse.ch.backend.controller.GreenhouseController;
import com.inhousegreenhouse.ch.backend.controller.SensorController;
import com.inhousegreenhouse.ch.backend.exception.GreenhouseNotInitializedException;
import com.inhousegreenhouse.ch.backend.model.sensor.SensorList;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.orchestrator.MonitoringConfig;
import com.inhousegreenhouse.ch.backend.orchestrator.MonitoringOrchestrator;

/**
 * This class is responsible for starting the monitoring system.
 */
public class StartupSequence extends Sequence implements IGreenhouseSequence {

    /**
     * The GreenhouseController used to talk with the backend.
     */
    private final GreenhouseController greenhouseController;

    /**
     * Constructor.
     */
    public StartupSequence() {
        super("START_UP_SEQUENCE");
        greenhouseController = new GreenhouseController();
    }

    /**
     * Starts the monitoring system.
     */
    @Override
    public void run() {
        System.out.println("-- S T A R T U P\t S E Q U E N C E --");
        System.out.println("[!] Starting up In-House Greenhouse system...");
        try {
            // Load greenhouse
            Greenhouse greenhouse = greenhouseController.getGreenhouse();

            // Print greenhouse information
            System.out.println();
            System.out.println("[!] Greenhouse loaded successfully.");
            System.out.println("[!] \t - Name: " + greenhouse.getName());
            System.out.println("[!] \t - Description: " + greenhouse.getDescription());
            System.out.println("[!] \t - UUID: " + greenhouse.getId());
            System.out.println();

            // Create sensor controller
            SensorController sensorController = new SensorController(greenhouse);

            // Read fetching sensors from API server
            System.out.println("[!] Fetching sensors from API server...");

            // Load sensors
            SensorList sensors = sensorController.getSensors();

            // Print number of sensors loaded
            System.out.println("[!] Loaded " + sensors.size() + " sensors");
            System.out.println("[!] \t - Temperature sensor: " + sensors.getTemperatureSensors().size());
            System.out.println("[!] \t - Humidity sensor: " + sensors.getHumiditySensors().size());
            System.out.println("[!] \t - Moisture sensor: " + sensors.getMoistureSensors().size());

            // Start the monitoring system
            System.out.println();
            System.out.println("[!] Starting monitor system orchestrator...");
            MonitoringOrchestrator monitoringOrchestrator = new MonitoringOrchestrator(sensors);
            monitoringOrchestrator.startMonitoring(
                new MonitoringConfig(10000, greenhouse)
            );

        } catch (GreenhouseNotInitializedException ex) {
            throw new RuntimeException("FATAL ERROR. Setup sequence failed to initialize greenhouse");
        }
    }
}
