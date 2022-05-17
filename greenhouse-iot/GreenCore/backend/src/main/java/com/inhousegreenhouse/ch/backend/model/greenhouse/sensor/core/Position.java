package com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core;

/**
 * This class represents a position on the board with a string value that defines the position id.
 */
public enum Position {
    /**
     * The position id for the top left corner.
     */
    TOP_RIGHT ("TOP_RIGHT"),

    /**
     * The position id for the top right corner.
     */
    TOP_LEFT("TOP_LEFT"),

    /**
     * The position id for the bottom left corner.
     */
    MIDDLE_LEFT("MIDDLE_LEFT"),

    /**
     * The position id for the bottom right corner.
     */
    MIDDLE_RIGHT("MIDDLE_RIGHT"),

    /**
     * The position id for the bottom left corner.
     */
    BOTTOM_LEFT("BOTTOM_LEFT"),

    /**
     * The position id for the bottom right corner.
     */
    BOTTOM_RIGHT("BOTTOM_RIGHT"),

    /**
     * The position id for the top left corner.
     */
    GENERAL("GLOBAL");

    /**
     * The position id.
     */
    final String ID;

    /**
     * Constructor for the position enum.
     * @param positionId The position id.
     */
    Position (String positionId) {
        this.ID = positionId;
    }


}
