package com.inhousegreenhouse.ch.backend.model.util;

/**
 * This class represents a variable of a GraphQL query.
 */
public class GraphQLVariable<T> {

    /**
     * The name of the variable.
     */
    private final String name;

    /**
     * The value of the variable.
     */
    private final T value;

    /**
     * Constructs a new GraphQLVariable.
     * @param name The name of the variable.
     * @param value The value of the variable.
     */
    public GraphQLVariable(final String name, final T value) {
        this.name = name;
        this.value = value;
    }

    /**
     * Returns the name of the variable.
     * @return The name of the variable.
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the value of the variable.
     * @return The value of the variable.
     */
    public T getValue() {
        return value;
    }

    /**
     * Returns a string representation of the variable.
     * @return A string representation of the variable.
     */
    public String encode() {
        // Check if the value is a string.
        if (value instanceof String) {
            // Return the string representation of the value.
            return String.format("\"%s\": \"%s\"", name, value);
        } else {
            // Return the string representation of the value.
            return String.format("\"%s\": %s", name, value);
        }
    }
}
