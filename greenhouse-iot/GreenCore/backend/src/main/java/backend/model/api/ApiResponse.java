package backend.model.api;

import org.json.JSONObject;

public class ApiResponse {
    public final boolean isSuccess;
    public final String errorMessage;
    public final String data;

    public ApiResponse(boolean isSuccess, String errorMessage, String data) {
        this.isSuccess = isSuccess;
        this.errorMessage = errorMessage;
        this.data = data;
    }

    public static boolean isGraphQLResponseError (JSONObject graphQLResponseData) {
        return graphQLResponseData.has("errors");
    }
}