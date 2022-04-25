package backend.model.api;

import backend.model.util.GraphQLQuery;

import java.net.URI;
import java.net.http.HttpRequest;

public class ApiRequest {

    private final GraphQLQuery query;
    private final ApiHeader[] headers;
    private final Api apiConfig;

    public ApiRequest (Api apiConfig, GraphQLQuery query, ApiHeader ... additionalHeaders) {
        this.query = query;
        this.headers = additionalHeaders;
        this.apiConfig = apiConfig;
    }

    public GraphQLQuery getQuery() {
        return query;
    }

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

    public ApiHeader[] getHeaders() {
        return headers;
    }

    public Api getApiConfig() {
        return apiConfig;
    }
}
