package backend.exception;

import backend.model.api.Api;

public class ProxyRequestFailException extends Throwable {

    private final Api.ApiResponse response;

    public ProxyRequestFailException(Api.ApiResponse response) {
        this.response = response;
    }

    public Api.ApiResponse getResponse() {
        return response;
    }
}
