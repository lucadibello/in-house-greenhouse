package backend.model.util;

/**
 * This class represents a variable of a GraphQL query.
 */
public class GraphQLVariable {

    /**
     * The name of the variable.
     */
    private final String name;

    /**
     * The value of the variable.
     */
    private final String value;

    /**
     * Constructs a new GraphQLVariable.
     * @param name The name of the variable.
     * @param value The value of the variable.
     */
    public GraphQLVariable(final String name, final String value) {
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
    public String getValue() {
        return value;
    }

    /**
     * Returns a string representation of the variable.
     * @return A string representation of the variable.
     */
    public String encode() {
        return String.format("\"%s\": \"%s\"", this.name, this.value);
    }
}
