package com.inhousegreenhouse.ch.app.core.sequence;

import com.inhousegreenhouse.ch.backend.exception.CriticalGreenhouseError;

/**
 * Common interface for all sequences of greenhouse.
 */
public interface IGreenhouseSequence {

    /**
     * Executes the sequence.
     * @throws CriticalGreenhouseError if the sequence face a critical error.
     */
    void run() throws CriticalGreenhouseError;
}
