package com.inhousegreenhouse.ch.backend.exception;

public class CriticalGreenhouseError extends RuntimeException {
    public CriticalGreenhouseError(String message) {
        super(message);
    }
}
