package backend.model.api;

import backend.model.util.GraphQLQuery;

import java.net.URI;
import java.net.http.HttpRequest;

public class ApiAuthenticatedRequest extends ApiRequest {
    private final String TOKEN;

    public ApiAuthenticatedRequest(Api api, GraphQLQuery query, String token, ApiHeader ... additionalHeaders) {
        super(api, query, additionalHeaders);
        // Save authentication token
        this.TOKEN = token;
    }

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
