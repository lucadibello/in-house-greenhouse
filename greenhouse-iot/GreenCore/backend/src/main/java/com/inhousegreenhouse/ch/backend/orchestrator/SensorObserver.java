package com.inhousegreenhouse.ch.backend.orchestrator;

import com.inhousegreenhouse.ch.backend.exception.ProxyRequestFailException;
import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.api.SensorApi;
import com.inhousegreenhouse.ch.backend.model.sensor.core.ISensor;

/**
 * The sensor observer is the interface that is used to observe the sensor.
 * @param <T> The type of the sensor that will be observed.
 */
public class SensorObserver<T extends ISensor<?>> implements Runnable {
    /**
     * The monitoring configuration.
     */
    private final MonitoringConfig config;

    /**
     * The sensor to observe.
     */
    private final T sensor;

    /**
     * The observer thread identifier.
     */
    private final String threadIdentifier;

    /**
     * Constructor.
     * @param config The monitoring configuration.
     * @param sensor The sensor to observe.
     * @param threadIdentifier The thread identifier.
     */
    public SensorObserver(MonitoringConfig config, T sensor, String threadIdentifier) {
        this.config = config;
        this.sensor = sensor;
        this.threadIdentifier = threadIdentifier;
    }

    /**
     * Start observing the sensor.
     */
    @Override
    public void run() {
        System.out.println("[Thread Orchestrator] " + threadIdentifier + " [CH. " + sensor.getChannel() +": Started sensor observer for sensor " + sensor.getName());

        while (MonitoringOrchestrator.isRunning) {
            // Wait a certain amount of time
            try {
                Thread.sleep(config.getTimeBetweenChecks());
            } catch (InterruptedException ignored) {
            }

            // Record data
            try {
                // Update sensor value
                sensor.updateAndGet();

                // Record data
                recordData();
            } catch (ProxyRequestFailException e) {
                System.out.println("[Thread Orchestrator] " + threadIdentifier + ": Error while recording data inside DB. ERROR=" + e.getResponse().errorMessage);
            } catch (SpiCannotBeInitializedException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Record data inside the database
     * @throws ProxyRequestFailException If the request to the proxy fails.
     * @throws SpiCannotBeInitializedException If the SPI cannot be initialized.
     */
    private void recordData () throws ProxyRequestFailException, SpiCannotBeInitializedException {
        // Create sensor api
        SensorApi sensorApi = new SensorApi();

        // Record data
        sensorApi.recordData(sensor, config.getGreenhouse());
        System.out.println("[Thread Orchestrator] " + threadIdentifier + ": Recorded data " + sensor.getCachedValue());
    }
}
