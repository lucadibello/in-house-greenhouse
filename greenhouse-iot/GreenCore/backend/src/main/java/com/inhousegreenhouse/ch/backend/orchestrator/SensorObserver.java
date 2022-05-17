package com.inhousegreenhouse.ch.backend.orchestrator;

import com.inhousegreenhouse.ch.backend.exception.ProxyRequestFailException;
import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.api.SensorApi;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.ISensor;

import java.util.Properties;
import java.util.concurrent.BrokenBarrierException;

/**
 * The sensor observer is the interface that is used to observe the sensor.
 *
 * @param <T> The type of the sensor that will be observed.
 */
public class SensorObserver<T extends ISensor<? extends Number>> implements Runnable {
    /**
     * The monitoring configuration.
     */
    private final MonitoringConfig config;

    /**
     * The sensor to observe.
     */
    private final T sensor;

    /**
     * GreenCore proxy URL
     */
    private final String proxyURL;

    /**
     * Constructor.
     *
     * @param config           The monitoring configuration.
     * @param sensor           The sensor to observe.
     * @param greenhouseSettings The loaded greenhouse settings.
     */
    public SensorObserver(MonitoringConfig config, T sensor, Properties greenhouseSettings) {
        this.config = config;
        this.sensor = sensor;

        // Build proxy URL using host and port
        this.proxyURL = "http://" + greenhouseSettings.getProperty("greencore.proxy.host") + ":" + greenhouseSettings.getProperty("greencore.proxy.port") + greenhouseSettings.getProperty("greencore.proxy.route");
    }

    /**
     * Start observing the sensor.
     */
    @Override
    public void run() {
        System.out.println("[Thread Orchestrator] " + sensor.getName() + " [CH. " + sensor.getChannel() + "]: Started sensor observer for sensor " + sensor.getName());

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

                // Update sensor enabled status if disabled
                if (!sensor.isEnabled()) {
                    sensor.setEnabled(true);
                }
            } catch (ProxyRequestFailException e) {
                System.out.println("[Thread Orchestrator] " + sensor.getName() + ": Error while recording data inside DB. ERROR=" + e.getResponse().errorMessage);
                if (sensor.isEnabled()) {
                    sensor.setEnabled(false);
                }
            } catch (SpiCannotBeInitializedException e) {
                e.printStackTrace();
            } finally {
                // Wait until cyclic barrier is exceeded
                try {
                    MonitoringOrchestrator.acquireBarrier().await();
                } catch (InterruptedException | BrokenBarrierException ex) {
                    System.out.println("[Thread Orchestrator] " + sensor.getName() + ": Error while waiting for barrier. ERROR=" + ex.getMessage());
                }
            }
        }
    }

    /**
     * Record data inside the database
     *
     * @throws ProxyRequestFailException       If the request to the proxy fails.
     * @throws SpiCannotBeInitializedException If the SPI cannot be initialized.
     */
    private void recordData() throws ProxyRequestFailException, SpiCannotBeInitializedException {
        // Create sensor api
        SensorApi sensorApi = new SensorApi(proxyURL);

        // Record data
        sensorApi.recordData(sensor, config.getGreenhouse());
        System.out.println("[Thread Orchestrator] " + sensor.getName() + ": Recorded data " + sensor.getCachedValue());
    }
}
