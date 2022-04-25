package backend.model.api;

public final class ApiHeader {
    private final String name;
    private final String value;

    public ApiHeader(final String name, final String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return this.name;
    }

    public String getValue() {
        return this.value;
    }
}
