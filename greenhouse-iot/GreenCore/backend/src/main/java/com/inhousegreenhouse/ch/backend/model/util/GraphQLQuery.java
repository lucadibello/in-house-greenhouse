package com.inhousegreenhouse.ch.backend.model.util;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * This class defines a GraphQL query.
 */
public class GraphQLQuery {
    /**
     * The variables of the query.
     */
    private final List<GraphQLVariable<?>> variables;

    /**
     * The actual GraphQL query.
     */
    private final String query;

    /**
     * Constructor.
     * @param queryLines The lines of the query.
     */
    public GraphQLQuery (String ... queryLines) {
        this.query = buildQuery(queryLines);
        this.variables = new ArrayList<>();
    }

    /**
     * Builds a GraphQL query from the given lines.
     * @param queryLines The lines of the query.
     * @return The actual GraphQL query in one single string
     */
    private String buildQuery (String... queryLines) {
        StringBuilder builder = new StringBuilder();
        for (String line : queryLines) {
            builder.append(line).append("\n");
        }
        return builder.toString();
    }

    /**
     * Adds a variable to the query.
     * @param variableName The name of the variable.
     * @param variableValue The value of the variable.
     * @return The updated GraphQLQuery object.
     */
    public <T> GraphQLQuery addVariable (String variableName, T variableValue) {
        // Add variable to query
        variables.add(new GraphQLVariable<>(variableName, variableValue));
        // Return context
        return this;
    }

    /**
     * Get the JSON encoded query string.
     * @return The updated GraphQLQuery object.
     */
    public String getQuery() {
        // Create empty JSON object
        JSONObject json = new JSONObject();

        json.put("query", query);

        // Check if variables are present
        if (variables.size() > 0) {
            // Add variables to query
            JSONObject variablesJson = new JSONObject();
            for (GraphQLVariable<?> variable : variables) {
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
