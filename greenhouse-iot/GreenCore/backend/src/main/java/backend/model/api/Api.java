package backend.model.api;

import backend.model.util.GraphQLQuery;
import org.json.JSONObject;

import java.io.IOException;
import java.net.ConnectException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

/**
 * This class is used to send requests to the GraphQL API.
 */
public abstract class Api {

    /**
     * The base URL of the API.
     */
    private final String BASE_URL = "http://localhost:6864/greenproxy";

    /**
     * Send a GraphQL query to the API.
     * @param apiRequest The GraphQL query to send.
     * @return The response of the query.
     */
    public ApiResponse sendRequest (ApiRequest apiRequest) {
        try {
            // create a client
            HttpClient client = HttpClient.newHttpClient();

            // create a request
            HttpRequest request = apiRequest.build();

            // use the client to send the request
            HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );

            // Convert the response to a JSON object.
            JSONObject json = new JSONObject(response.body());

            // Return the response as a new ApiResponse object.
            return new ApiResponse(
                    json.getBoolean("Success"),
                    json.getString("ErrorMessage"),
                    json.getString("Data")
            );
        } catch (ConnectException e) {
            // Return a new ApiResponse object with an error message.
            return new ApiResponse(
                    false,
                    "Connection refused from proxy, is it even running? " + e.getMessage(),
                    ""
            );
        } catch (IOException | InterruptedException e) {
            // Return a new ApiResponse object with an error message.
            return new ApiResponse(
                    false,
                    "Error while sending request to Proxy." + e.getMessage(),
                    ""
            );
        }
    }

    /**
     * The URL of the API.
     * @return The URL of the API.
     */
    public String getBaseUrl() {
        return BASE_URL;
    }
}
