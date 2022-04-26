package backend.model.api;

import org.json.JSONObject;

/**
 * This class represents a response from the API, received through GreenProxy server.
 */
public class ApiResponse {

    /**
     * The status of the response from the GreenProxy forward proxy server.
     */
    public final boolean isSuccess;

    /**
     * The response body.
     */
    public final String errorMessage;

    /**
     * The response body as JSON.
     */
    public final JSONObject data;

    /**
     * Constructor.
     * @param isSuccess The status of the response.
     * @param errorMessage The response body.
     * @param data The response body as JSON.
     */
    public ApiResponse(boolean isSuccess, String errorMessage, String data) {
        this.isSuccess = isSuccess;
        this.errorMessage = errorMessage;
        this.data = new JSONObject(data);
    }

    /**
     * Checks if the response from the GraphQL server is successful.
     * @return True if the response is successful, false otherwise.
     */
    public boolean isGraphQLResponseError () {
        return data.has("errors");
    }
}