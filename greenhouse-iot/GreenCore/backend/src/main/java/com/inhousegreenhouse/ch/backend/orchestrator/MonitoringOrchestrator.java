package com.inhousegreenhouse.ch.backend.orchestrator;

import com.inhousegreenhouse.ch.backend.model.sensor.*;
import com.inhousegreenhouse.ch.backend.model.sensor.core.SensorList;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * Sensor observers orchestrator required to monitor the greenhouse sensors.
 */
public class MonitoringOrchestrator {
    /**
     * Is the orchestrator running?
     */
    public static volatile boolean isRunning = true;

    /**
     * List of sensors to monitor.
     */
    private final SensorList sensorList;

    /**
     * List of sensor observer threads.
     */
    private final List<Thread> threadPool = new ArrayList<>();


    /**
     * Settings for the greencore system.
     */
    private final Properties settings;

    /**
     * Constructor.
     * @param sensorList List of sensors to monitor.
     */
    public MonitoringOrchestrator(SensorList sensorList, Properties settings) {
        this.sensorList = sensorList;
        this.settings = settings;
    }

    /**
     * Start the monitoring orchestrator.
     * @param config Monitoring configuration.
     */
    public void startMonitoring (MonitoringConfig config) {
        // Initialize the thread pool
        threadPool.addAll(initializeThreadPool(config));

        // Start all threads
        System.out.println("[!] Starting individual sensor monitoring...");
        for (Thread thread : threadPool) {
            thread.start();
        }
        System.out.println("[!] ALl monitor threads have been notified to start successfully.");
    }

    /**
     * Initialize the sensor observers into the thread pool.
     * @param config Monitoring configuration.
     * @return List of sensor observers threads.
     */
    private List<Thread> initializeThreadPool (MonitoringConfig config) {
        List<Thread> tempPool = new ArrayList<>();
        // Create a thread pool
        int counter = 0;
        for (TemperatureSensor sensor : sensorList.getTemperatureSensors()) {
            tempPool.add(new Thread(new SensorObserver<>(config, sensor, "TemperatureSensor-" + counter++, settings)));
        }
        counter = 0;
        for (HumiditySensor sensor : sensorList.getHumiditySensors()) {
            tempPool.add(new Thread(new SensorObserver<>(config, sensor, "HumiditySensor-" + counter++, settings)));
        }
        counter = 0;
        for (MoistureSensor sensor : sensorList.getMoistureSensors()) {
            tempPool.add(new Thread(new SensorObserver<>(config, sensor, "MoistureSensor-" + counter++, settings)));
        }

        // Return the thread pool
        return tempPool;
    }

    /**
     * Stop the monitoring orchestrator.
     */
    public void stopMonitoring () {
        isRunning = false;
    }
}
