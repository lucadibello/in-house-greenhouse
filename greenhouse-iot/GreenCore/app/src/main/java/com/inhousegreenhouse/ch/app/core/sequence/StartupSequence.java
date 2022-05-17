package com.inhousegreenhouse.ch.app.core.sequence;

import com.inhousegreenhouse.ch.backend.controller.GreenhouseController;
import com.inhousegreenhouse.ch.backend.controller.SensorController;
import com.inhousegreenhouse.ch.backend.exception.CriticalGreenhouseError;
import com.inhousegreenhouse.ch.backend.exception.GreenhouseNotInitializedException;
import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.SensorList;
import com.inhousegreenhouse.ch.backend.model.greenhouse.watering.WateringSystem;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.orchestrator.MonitoringConfig;
import com.inhousegreenhouse.ch.backend.orchestrator.MonitoringOrchestrator;
import com.pi4j.io.gpio.RaspiPin;

import java.util.Properties;

/**
 * This class is responsible for starting the monitoring system.
 */
public class StartupSequence extends Sequence implements IGreenhouseSequence {

    /**
     * The GreenhouseController used to talk with the backend.
     */
    private final GreenhouseController greenhouseController;

    /**
     * Settings for the GreenCore system.
     */
    private final Properties settings;

    /**
     * Constructor.
     * @param settings The loaded greenhouse settings.
     */
    public StartupSequence(Properties settings) {
        super("START_UP_SEQUENCE");
        greenhouseController = new GreenhouseController(settings);
        this.settings = settings;
    }

    /**
     * Starts the monitoring system.
     * @throws CriticalGreenhouseError if the monitoring system cannot be started.
     */
    @Override
    public void run() throws CriticalGreenhouseError {
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
            SensorController sensorController = new SensorController(greenhouse, settings);

            // Read fetching sensors from API server
            System.out.println("[!] Fetching sensors from API server...");

            // Load sensors
            SensorList sensors = sensorController.getSensors();

            // Print number of sensors loaded
            System.out.println("[!] Loaded " + sensors.size() + " sensors");
            System.out.println("[!] \t - Temperature sensor: " + sensors.getTemperatureSensors().size());
            System.out.println("[!] \t - Humidity sensor: " + sensors.getHumiditySensors().size());
            System.out.println("[!] \t - Moisture sensor: " + sensors.getMoistureSensors().size());

            // Check if any sensor has been loaded
            if (sensors.size() == 0) {
                // Error: no sensor loaded
                System.out.println("[!] Any sensor has been loaded. Restarting startup phase in 10 seconds...");

                // FIXME: Try to detect if docker is running
                // FIXME: Then, check if the proxy is running
                // FIXME: Then, check if the proxy is running

                // Wait for 10 seconds
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e) {
                    System.out.println("[!] Sleep interrupted");
                }
                // Restart startup sequence
                throw new CriticalGreenhouseError("No sensor has been loaded.");
            }

            // Create watering system controller
            WateringSystem wateringSystem = new WateringSystem(RaspiPin.GPIO_17);

            // Start the monitoring system
            System.out.println();
            System.out.println("[!] Starting monitor system orchestrator...");
            MonitoringOrchestrator monitoringOrchestrator = new MonitoringOrchestrator(sensors, settings);
            monitoringOrchestrator.startMonitoring(
                new MonitoringConfig(10000, greenhouse),
                wateringSystem
            );
        } catch (GreenhouseNotInitializedException ex) {
            throw new RuntimeException("FATAL ERROR. Setup sequence failed to initialize greenhouse");
        } catch (SpiCannotBeInitializedException e) {
            throw new RuntimeException("FATAL ERROR. SPI cannot be initialized");
        }
    }
}
