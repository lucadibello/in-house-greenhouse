package core.sequence;

import backend.exception.CriticalGreenhouseError;

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
