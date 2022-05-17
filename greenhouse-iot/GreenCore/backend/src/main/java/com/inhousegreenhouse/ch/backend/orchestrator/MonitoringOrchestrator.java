package com.inhousegreenhouse.ch.backend.orchestrator;

import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.HumiditySensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.MoistureSensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.TemperatureSensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.SensorList;
import com.inhousegreenhouse.ch.backend.model.greenhouse.watering.WateringSystem;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Sensor observers orchestrator required to monitor the greenhouse sensors.
 */
public class MonitoringOrchestrator {
    /**
     * Is the orchestrator running?
     */
    public static volatile boolean isRunning = true;

    /**
     * Cyclic barrier, used to synchronize all threads.
     */
    private static CyclicBarrier barrier;

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
     * Minimum level of humidity to be considered as a dry sensor.
     */
    private final double minHumidity;

    /**
     * Duration of the watering cycle.
     */
    private final int wateringDuration;

    /**
     * Constructor.
     * @param sensorList List of sensors to monitor.
     * @param settings The loaded greenhouse settings.
     */
    public MonitoringOrchestrator(SensorList sensorList, Properties settings) {
        this.sensorList = sensorList;
        this.settings = settings;

        // Read the setting called 'greencore.watering.minHumidityBeforeWatering', convert it to a double and save it into a local variable
        double tempMinHumidity = 0.4;
        try {
            tempMinHumidity = Double.parseDouble(settings.getProperty("greencore.watering.minHumidityBeforeWatering"));
        } catch (NumberFormatException e) {
            System.out.println("The value of the setting 'greencore.watering.minHumidityBeforeWatering' is not a valid number. The default value will be used: " + tempMinHumidity);
        } finally {
            // Save value
            minHumidity = tempMinHumidity;
        }

        int tempWateringTime = 600;
        try {
            tempWateringTime = Integer.parseInt(settings.getProperty("greencore.watering.wateringTimeMillisecond"));
        } catch (NumberFormatException e) {
            System.out.println("The value of the setting 'greencore.watering.wateringTimeMillisecond' is not a valid number. The default value will be used: " + tempWateringTime);
        } finally {
            // Save value
            wateringDuration = tempWateringTime;
        }
    }

    /**
     * Start the monitoring orchestrator.
     * @param config Monitoring configuration.
     * @param wateringSystem A reference to the watering system object.
     */
    public void startMonitoring (MonitoringConfig config, WateringSystem wateringSystem) {
        // Initialize the thread pool
        threadPool.addAll(initializeThreadPool(config));

        // Initialize cyclic barrier
        barrier = new CyclicBarrier(threadPool.size(), () -> {
            System.out.println();
            System.out.println("[Monitoring] All sensor threads have reached the check barrier. Checking soil sensors...");

            // Local variable
            final AtomicBoolean isWatering = new AtomicBoolean(false);

            // Read all sensors
            sensorList.getMoistureSensors().forEach(sensor -> {
                if (!isWatering.get()) {
                    // Check if sensor is enabled
                    if (sensor.isEnabled()) {
                        // Print sensor data
                        System.out.println(sensor.getName() + ": " + sensor.getCachedValue());

                        // Check if sensor is dry
                        if (sensor.getCachedValue() < minHumidity) {
                            // Sensor is dry, water it
                            System.out.println("Need to water our plants! Thank you " + sensor.getName() + " for having notified me :)");

                            // Set flag to true to avoid watering multiple times
                            isWatering.set(true);

                            // Water the plants for a while
                            wateringSystem.turnOnFor(wateringDuration);
                        }
                    } else {
                        // Print sensor disabled message
                        System.out.println(sensor.getName() + ": disabled");
                    }
                }
            });
            // Space
            System.out.println();
        });

        // Start all threads
        System.out.println("[!] Starting individual sensor monitoring...");
        for (Thread thread : threadPool) {
            thread.start();
        }
        System.out.println("[!] All monitor threads have been notified to start successfully.");
    }

    /**
     * Initialize the sensor observers into the thread pool.
     * @param config Monitoring configuration.
     * @return List of sensor observers threads.
     */
    private List<Thread> initializeThreadPool (MonitoringConfig config) {
        List<Thread> tempPool = new ArrayList<>();
        // Create a thread pool
        for (TemperatureSensor sensor : sensorList.getTemperatureSensors()) {
            tempPool.add(new Thread(new SensorObserver<>(config, sensor, settings)));
        }
        for (HumiditySensor sensor : sensorList.getHumiditySensors()) {
            tempPool.add(new Thread(new SensorObserver<>(config, sensor, settings)));
        }
        for (MoistureSensor sensor : sensorList.getMoistureSensors()) {
            tempPool.add(new Thread(new SensorObserver<>(config, sensor, settings)));
        }

        // Return the thread pool
        return tempPool;
    }

    /**
     * Acquire the barrier used to synchronize all threads.
     * @return A Cyclic barrier.
     */
    public static CyclicBarrier acquireBarrier () {
        return barrier;
    }

    /**
     * Stop the monitoring orchestrator.
     */
    public void stopMonitoring () {
        isRunning = false;
    }
}
