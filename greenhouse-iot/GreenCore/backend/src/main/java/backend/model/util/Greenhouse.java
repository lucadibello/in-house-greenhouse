package backend.model.util;

public class Greenhouse {
    private final String uuid;
    private final String name;
    private final String description;

    public Greenhouse(String uuid, String name, String description) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
    }

    public String getId() {
        return uuid;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
