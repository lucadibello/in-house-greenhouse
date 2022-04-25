package backend.model.api;

import backend.model.util.GraphQLQuery;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public abstract class Api {

    public static class ApiResponse {
        public final boolean isSuccess;
        public final String errorMessage;
        public final String data;

        public ApiResponse(boolean isSuccess, String errorMessage, String data) {
            this.isSuccess = isSuccess;
            this.errorMessage = errorMessage;
            this.data = data;
        }
    }

    /**
     * The base URL of the API.
     */
    private final String BASE_URL = "http://localhost:6864/greenproxy";

    /**
     * Send a GraphQL query to the API.
     * @param query The GraphQL query to send.
     * @return The response of the query.
     */
    public ApiResponse sendRequest (GraphQLQuery query) {
        try {
            // create a client
            HttpClient client = HttpClient.newHttpClient();

            // create a request
            HttpRequest request = HttpRequest.newBuilder(URI.create(BASE_URL))
                .header("accept", "application/json")
                .header("Content-Type", "application/json")
                .header("X-Greenhouse-UUID", "ASDASD") // FIXME: Add actual greenhouse UUID
                .POST(HttpRequest.BodyPublishers.ofString(query.toString()))
                .timeout(java.time.Duration.ofSeconds(7))
                .build();

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
        } catch (IOException | InterruptedException e) {
            // Print the error message.
            e.printStackTrace();
            // Return a new ApiResponse object with an error message.
            return new ApiResponse(
                    false,
                    "Error while sending request to Proxy. Is the proxy even running? " + e.getMessage(),
                    ""
            );
        }
    }

    public String sendRequestAsync (GraphQLQuery query) {
        // Send an HTTP request to the API base URL with the query as the body.
        return "";
    }


    /**
     * The URL of the API.
     * @return The URL of the API.
     */
    public String getBaseUrl() {
        return BASE_URL;
    }
}
