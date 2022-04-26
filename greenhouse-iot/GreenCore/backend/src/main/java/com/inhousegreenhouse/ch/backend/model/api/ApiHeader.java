package com.inhousegreenhouse.ch.backend.model.api;

/**
 * This class represents a header of an API request.
 */
public final class ApiHeader {

    /**
     * The name of the header.
     */
    private final String name;

    /**
     * The value of the header.
     */
    private final String value;

    /**
     * Constructs a new header.
     * @param name The name of the header.
     * @param value The value of the header.
     */
    public ApiHeader(final String name, final String value) {
        this.name = name;
        this.value = value;
    }

    /**
     * Returns the name of the header.
     * @return The name of the header.
     */
    public String getName() {
        return this.name;
    }

    /**
     * Returns the value of the header.
     * @return The value of the header.
     */
    public String getValue() {
        return this.value;
    }
}
