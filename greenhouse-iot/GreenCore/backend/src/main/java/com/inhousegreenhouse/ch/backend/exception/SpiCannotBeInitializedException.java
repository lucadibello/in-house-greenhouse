package com.inhousegreenhouse.ch.backend.exception;

/**
 * Exception thrown when the SPI communication interface cannot be initialized.
 */
public class SpiCannotBeInitializedException extends Exception {

    /**
     * Constructor.
     * @param message The exception message.
     */
    public SpiCannotBeInitializedException(String message) {
        super(message);
    }
}
