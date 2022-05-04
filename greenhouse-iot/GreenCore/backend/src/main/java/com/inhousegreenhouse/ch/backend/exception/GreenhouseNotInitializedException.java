package com.inhousegreenhouse.ch.backend.exception;

/**
 * Exception thrown when the greenhouse is not initialized.
 */
public class GreenhouseNotInitializedException extends Exception{

    /**
     * Constructor.
     * @param message The exception message.
     */
    public GreenhouseNotInitializedException(String message) {
        super(message);
    }
}
