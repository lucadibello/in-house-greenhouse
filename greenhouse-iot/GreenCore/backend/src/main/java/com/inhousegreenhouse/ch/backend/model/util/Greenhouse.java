package com.inhousegreenhouse.ch.backend.model.util;

/**
 * This class represents a registered greenhouse.
 */
public class Greenhouse {

    /**
     * The unique identifier of the greenhouse.
     */
    private final String uuid;

    /**
     * The name of the greenhouse.
     */
    private final String name;

    /**
     * The location of the greenhouse.
     */
    private final String description;

    /**
     * Constructor.
     * @param uuid The unique identifier of the greenhouse.
     * @param name The name of the greenhouse.
     * @param description The location of the greenhouse.
     */
    public Greenhouse(String uuid, String name, String description) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
    }

    /**
     * Returns the unique identifier of the greenhouse.
     * @return The unique identifier of the greenhouse.
     */
    public String getId() {
        return uuid;
    }

    /**
     * Returns the name of the greenhouse.
     * @return The name of the greenhouse.
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the location of the greenhouse.
     * @return The location of the greenhouse.
     */
    public String getDescription() {
        return description;
    }
}
