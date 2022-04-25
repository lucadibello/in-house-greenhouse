package backend.model.util;

public class GraphQLVariable {
    private final String name;
    private final String value;

    public GraphQLVariable(final String name, final String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public String encode() {
        return String.format("\"%s\": \"%s\"", this.name, this.value);
    }
}
