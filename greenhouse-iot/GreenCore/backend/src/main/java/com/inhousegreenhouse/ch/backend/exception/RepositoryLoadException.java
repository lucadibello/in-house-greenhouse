package com.inhousegreenhouse.ch.backend.exception;

/**
 * Exception thrown when a repository could not be loaded.
 */
public class RepositoryLoadException extends Exception {

    /**
     * Constructor.
     * @param message The exception message.
     */
    public RepositoryLoadException(String message) {
        super(message);
    }
}
