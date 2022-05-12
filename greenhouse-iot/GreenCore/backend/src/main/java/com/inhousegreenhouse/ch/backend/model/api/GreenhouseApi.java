package com.inhousegreenhouse.ch.backend.model.api;

import com.inhousegreenhouse.ch.backend.model.util.GraphQLQuery;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.exception.ProxyRequestFailException;
import org.json.JSONObject;

/**
 * GreenhouseApi is a class that handles all requests to the Greenhouse API.
 */
public class GreenhouseApi extends Api {

    /**
     * Access token needed to access the Greenhouse API.
     */
    private final String USER_TOKEN;

    /**
     * Constructor for GreenhouseApi.
     * @param userToken The access token needed to access the Greenhouse API.
     */
    public GreenhouseApi(String userToken, String proxyURL) {
        super(proxyURL);
        this.USER_TOKEN = userToken;
    }

    /**
     * Register a new greenhouse inside the Greenhouse API.
      * @param name The name of the greenhouse.
     * @param description The description of the greenhouse.
     * @return The greenhouse that was registered as a Greenhouse object.
     * @throws ProxyRequestFailException If the request to the Greenhouse API fails.
     */
    public Greenhouse registerGreenhouse(String name, String description) throws ProxyRequestFailException {
        // Build GraphQL query
        final GraphQLQuery query = new GraphQLQuery(
                "mutation AddGreenhouse($name: String!, $description: String) {",
                "    addGreenhouse(name: $name, description: $description) {",
                "        id",
                "        name",
                "        description",
                "    }",
                "}"
        )
                .addVariable("name", name)
                .addVariable("description", description);

        // Create API request
        final ApiRequest request = new ApiAuthenticatedRequest(this, query, USER_TOKEN);

        // Send HTTP requests to API base URL and get response
        final ApiResponse response = sendRequest(request);

        // Check if response is valid
        if (response.isSuccess) {
            // Parse GraphQL response to a list of sensors
            System.out.println("[GREEN PROXY] GreenProxy works like a charm! The request has been forwarded to the API server...");

            // Check if response is a GraphQL error
            if (response.isGraphQLResponseError()) {
                // Read GraphQL error message
                final String errorMessage = response.data.getJSONArray("errors").getJSONObject(0).getString("message");
                System.out.println("[ERROR] GraphQL has returned an error: " + errorMessage);
                throw new ProxyRequestFailException(new ApiResponse(false, errorMessage, ""));
            } else {
                // Read GraphQL response
                JSONObject data = response.data.getJSONObject("data").getJSONObject("addGreenhouse");

                // Return sensor list
                return new Greenhouse(
                    data.getString("id"),
                    data.getString("name"),
                    data.getString("description")
                );
            }
        } else {
            System.out.println("[ERROR] The register request has failed: " + response.errorMessage);
            // Throw exception
            throw new ProxyRequestFailException(response);
        }
    }
}
