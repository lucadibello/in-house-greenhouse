package backend.model.util;

import org.json.JSONObject;
import org.json.JSONString;

import java.util.ArrayList;
import java.util.List;

public class GraphQLQuery {
    private final List<GraphQLVariable> variables;
    private final String query;

    public GraphQLQuery (String ... queryLines) {
        this.query = buildQuery(queryLines);
        this.variables = new ArrayList<>();
    }

    private String buildQuery (String... queryLines) {
        StringBuilder builder = new StringBuilder();
        for (String line : queryLines) {
            builder.append(line).append("\n");
        }
        return builder.toString();
    }

    public GraphQLQuery addVariable (String variableName, String variableValue) {
        // Add variable to query
        variables.add(new GraphQLVariable(variableName, variableValue));
        // Return context
        return this;
    }

    public String getQuery() {
        // Create empty JSON object
        JSONObject json = new JSONObject();

        json.put("query", query);

        // Check if variables are present
        if (variables.size() > 0) {
            // Add variables to query
            JSONObject variablesJson = new JSONObject();
            for (GraphQLVariable variable : variables) {
                // Create a JSON object for the variable
                // Add variable name and value to JSON object
                variablesJson.put(variable.getName(), variable.getValue());
            }
            // Add variable JSON object to query JSON object
            json.accumulate("variables", variablesJson);

            // Return query JSON object
            return json.toString();
        } else {
            // Return query
            return json.toString();
        }
    }
}
