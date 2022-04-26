package com.inhousegreenhouse.ch.backend.orchestrator;

import com.inhousegreenhouse.ch.backend.exception.ProxyRequestFailException;
import com.inhousegreenhouse.ch.backend.model.api.SensorApi;
import com.inhousegreenhouse.ch.backend.model.sensor.ISensor;

public class SensorObserver<T extends ISensor<?>> implements Runnable {

    private final MonitoringConfig config;
    private final T sensor;
    private final String threadIdentifier;

    public SensorObserver(MonitoringConfig config, T sensor, String threadIdentifier) {
        this.config = config;
        this.sensor = sensor;
        this.threadIdentifier = threadIdentifier;
    }

    @Override
    public void run() {
        System.out.println("[Thread Orchestrator] " +
                threadIdentifier + ": Started sensor observer for sensor " + sensor.getName());

        while (MonitoringOrchestrator.isRunning) {
            // Wait a certain amount of time
            try {
                Thread.sleep(config.getTimeBetweenChecks());
            } catch (InterruptedException e) {
            }

            System.out.println("Checking sensor " + sensor.getName() + " ...");

            // Update sensor value
            sensor.updateValue();

            // Record data
            try {
                // Record data
                recordData();
            } catch (ProxyRequestFailException e) {
                System.out.println("[Thread Orchestrator] " + threadIdentifier + ": Error while recording data inside DB." + e.getResponse().errorMessage);
            }
        }
    }

    /**
     * Record data inside the database
     */
    private void recordData () throws ProxyRequestFailException {
        // Create sensor api
        SensorApi sensorApi = new SensorApi();

        // Record data
        sensorApi.recordData(sensor, config.getGreenhouse());
        System.out.println("[Thread Orchestrator] " + threadIdentifier + ": Recorded data " + sensor.getValue());
    }
}
