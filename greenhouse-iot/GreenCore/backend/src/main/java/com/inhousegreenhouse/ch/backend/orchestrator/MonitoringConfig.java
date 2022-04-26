package com.inhousegreenhouse.ch.backend.orchestrator;

import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;

public final class MonitoringConfig {
    private final long timeBetweenChecks;
    private final Greenhouse greenhouse;

    public MonitoringConfig(final long timeBetweenChecks, final Greenhouse greenhouse) {
        this.timeBetweenChecks = timeBetweenChecks;
        this.greenhouse = greenhouse;
    }

    public long getTimeBetweenChecks() {
        return timeBetweenChecks;
    }

    public Greenhouse getGreenhouse() {
        return greenhouse;
    }
}
