package backend.model.util;

public class GraphQLQuery {

    private final String query;

    public GraphQLQuery (String ... queryLines) {
        this.query = buildQuery(queryLines);
    }

    private String buildQuery (String... queryLines) {
        StringBuilder builder = new StringBuilder();
        for (String line : queryLines) {
            builder.append(line).append("\n");
        }
        return builder.toString();
    }

    public String getQuery() {
        return query;
    }

    @Override
    public String toString() {
        return query;
    }
}
