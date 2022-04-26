package backend.model.api;

import backend.model.util.GraphQLQuery;

import java.net.URI;
import java.net.http.HttpRequest;

/**
 * This class represents an API request.
 */
public class ApiRequest {

    /**
     * The GraphQL query that is sent to the API.
     */
    private final GraphQLQuery query;

    /**
     * The additional headers that are sent with the HTTP request.
     */
    private final ApiHeader[] headers;

    /**
     * The API configuration object.
     */
    private final Api apiConfig;

    /**
     * Constructor.
     * @param apiConfig The API configuration object.
     * @param query The GraphQL query that is sent to the API.
     * @param additionalHeaders The additional headers that are sent with the HTTP request.
     */
    public ApiRequest (Api apiConfig, GraphQLQuery query, ApiHeader ... additionalHeaders) {
        this.query = query;
        this.headers = additionalHeaders;
        this.apiConfig = apiConfig;
    }


    /**
     * Get the HTTP request object.
     * @return The HTTP request as a HttpRequest object.
     */
    public HttpRequest build () {
        HttpRequest.Builder request = HttpRequest.newBuilder(URI.create(apiConfig.getBaseUrl()))
                .header("accept", "application/json")
                .header("Content-Type", "application/json");

        // Add all additional headers
        for (ApiHeader header : this.getHeaders()) {
            request.header(header.getName(), header.getValue());
        }

        // Build the request body
        return request
                .POST(HttpRequest.BodyPublishers.ofString(query.getQuery()))
                .timeout(java.time.Duration.ofSeconds(7))
                .build();
    }

    /**
     * Get the GraphQL basic query, without headers and variables.
     * @return The GraphQL basic query.
     */
    public GraphQLQuery getQuery() {
        return query;
    }

    /**
     * Get the additional headers that are sent with the HTTP request.
     * @return The additional headers that are sent with the HTTP request.
     */
    public ApiHeader[] getHeaders() {
        return headers;
    }

    /**
     * Get the API configuration object.
     * @return The API configuration object.
     */
    public Api getApiConfig() {
        return apiConfig;
    }
}
