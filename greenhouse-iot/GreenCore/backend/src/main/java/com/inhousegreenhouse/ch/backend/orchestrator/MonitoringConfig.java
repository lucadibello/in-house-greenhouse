package com.inhousegreenhouse.ch.backend.orchestrator;

import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;

/**
 * The sensor monitoring configuration.
 */
public final class MonitoringConfig {

    /**
     * The amount of time to wait between sensor readings.
     */
    private final long timeBetweenChecks;

    /**
     * The greenhouse to monitor.
     */
    private final Greenhouse greenhouse;

    /**
     * Constructor.
     * @param timeBetweenChecks the amount of time to wait between sensor readings
     * @param greenhouse the greenhouse to monitor
     */
    public MonitoringConfig(final long timeBetweenChecks, final Greenhouse greenhouse) {
        this.timeBetweenChecks = timeBetweenChecks;
        this.greenhouse = greenhouse;
    }

    /**
     * Getter for the time between sensor readings.
     * @return the time between sensor readings
     */
    public long getTimeBetweenChecks() {
        return timeBetweenChecks;
    }

    /**
     * Getter for the greenhouse to monitor.
     * @return the greenhouse to monitor
     */
    public Greenhouse getGreenhouse() {
        return greenhouse;
    }
}
