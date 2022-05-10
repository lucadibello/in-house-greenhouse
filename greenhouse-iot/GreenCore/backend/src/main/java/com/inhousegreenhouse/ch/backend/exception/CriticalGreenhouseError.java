package com.inhousegreenhouse.ch.backend.exception;

/**
 * Exception thrown when a critical error occurs in the backend.
 */
public class CriticalGreenhouseError extends RuntimeException {

    /**
     * Constructor.
     * @param message The exception message.
     */
    public CriticalGreenhouseError(String message) {
        super(message);
    }
}
