package backend.exception;

import backend.model.api.ApiResponse;

public class ProxyRequestFailException extends Exception {

    private final ApiResponse response;

    public ProxyRequestFailException(ApiResponse response) {
        super(response.errorMessage);
        this.response = response;
    }

    public ApiResponse getResponse() {
        return response;
    }
}
