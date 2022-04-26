package com.inhousegreenhouse.ch.backend.model.api;

import com.inhousegreenhouse.ch.backend.model.util.GraphQLQuery;

import java.net.URI;
import java.net.http.HttpRequest;

/**
 * This class represent an API request that is authenticated with an API token.
 */
public class ApiAuthenticatedRequest extends ApiRequest {
    /**
     * The API token to use for authentication.
     */
    private final String TOKEN;

    /**
     * Constructor.
     * @param api The API configuration object to use.
     * @param query The GraphQL query that will sent to the APIs.
     * @param token The API token to use for authentication.
     * @param additionalHeaders The additional headers to use for the request.
     */
    public ApiAuthenticatedRequest(Api api, GraphQLQuery query, String token, ApiHeader ... additionalHeaders) {
        super(api, query, additionalHeaders);
        // Save authentication token
        this.TOKEN = token;
    }

    /**
     * Build the request to send to the API.
     * @return The request to send to the API as an HttpRequest.
     */
    @Override
    public HttpRequest build() {
        HttpRequest.Builder request = HttpRequest.newBuilder(URI.create(super.getApiConfig().getBaseUrl()))
                .header("accept", "application/json")
                .header("Content-Type", "application/json");

        // Add authentication token
        request.header("Authorization", this.TOKEN);

        // Add all additional headers
        for (ApiHeader header : this.getHeaders()) {
            request.header(header.getName(), header.getValue());
        }

        // Build request
        return request
            .POST(HttpRequest.BodyPublishers.ofString(super.getQuery().getQuery()))
            .timeout(java.time.Duration.ofSeconds(7))
            .build();
    }
}
