package com.inhousegreenhouse.ch.backend.exception;

import com.inhousegreenhouse.ch.backend.model.api.ApiResponse;

/**
 * Exception thrown when a proxy request fails.
 */
public class ProxyRequestFailException extends Exception {

    /**
     * The api response, received from the GreenProxy forward proxy server.
     */
    private final ApiResponse response;

    /**
     * Constructor.
     * @param response The api response, received from the GreenProxy forward proxy server.
     */
    public ProxyRequestFailException(ApiResponse response) {
        super(response.errorMessage);
        this.response = response;
    }

    /**
     * Getter for the api response.
     * @return The api response, received from the GreenProxy forward proxy server.
     */
    public ApiResponse getResponse() {
        return response;
    }
}
