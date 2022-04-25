package backend.model.api;


import backend.exception.ProxyRequestFailException;
import backend.model.util.GraphQLQuery;
import backend.model.util.Greenhouse;
import org.json.JSONObject;

public class GreenhouseApi extends Api {

    private final String USER_TOKEN;

    public GreenhouseApi(String userToken) {
        this.USER_TOKEN = userToken;
    }

    /**
     * The name of the greenhouse.
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

            // Parse response to JSON object
            final JSONObject jsonObject = new JSONObject(response.data);

            // Check if response is a GraphQL error
            if (ApiResponse.isGraphQLResponseError(jsonObject)) {
                // Read GraphQL error message
                final String errorMessage = jsonObject.getJSONArray("errors").getJSONObject(0).getString("message");
                System.out.println("[ERROR] GraphQL has returned an error: " + errorMessage);
                throw new ProxyRequestFailException(new ApiResponse(false, errorMessage, ""));
            } else {
                // Read GraphQL response
                JSONObject data = jsonObject.getJSONObject("data").getJSONObject("addGreenhouse");

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
