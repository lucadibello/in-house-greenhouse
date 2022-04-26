package proxy

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"

	"greenproxy/authentication"
	"net/http"
)

type Proxy struct {
	ProxyRoute  string
	ApiEndpoint string
}

type ProxyResponse struct {
	Success      bool
	ErrorMessage string
	Data         string
}

// Handle an API request
func ProxyRequest(w http.ResponseWriter, r *http.Request, settings Proxy) {
	// Notify that the request is being processed
	fmt.Println("[GreenProxy] Request received:", r.RemoteAddr)

	// Check if user is already authenticated
	isAlreadyAuthenticated := r.Header.Get("Authorization") != ""

	// Create temporary variable that will hold the authentication response
	var authenticationStatus authentication.AuthenticationResult

	if !isAlreadyAuthenticated {
		// Check if user has sent X-Greenhouse-UUID header
		if r.Header.Get("X-Greenhouse-UUID") == "" {
			// User has not sent X-Greenhouse-UUID header
			fmt.Println("[GreenProxy] User has not sent X-Greenhouse-UUID header")

			// Set response as JSON
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)

			// Send response to user
			json.NewEncoder(w).Encode(ProxyResponse{
				false,
				"User has not sent X-Greenhouse-UUID header",
				"",
			})

			return
		}

		// Save new status
		fmt.Println("[GreenProxy] Request new authentication token for request")
		authenticationStatus = authentication.Authenticate(settings.ApiEndpoint, r.Header.Get("X-Greenhouse-UUID"))
		fmt.Println()
	} else {
		// User is already authenticated, create a new authenticationStatus object with the token
		fmt.Println("[GreenProxy] User is already authenticated")

		// Create new authenticationStatus object
		authenticationStatus = authentication.AuthenticationResult{
			Success:      true,
			Token:        r.Header.Get("Authorization"),
			ErrorMessage: "",
		}
	}

	// Check if authentication was successful
	if authenticationStatus.Success {
		// Create new request to API using same settings as the incoming one
		buf, err := ioutil.ReadAll(r.Body)

		if err != nil {
			fmt.Println("[GreenProxy] Error while copying original request body. ", err.Error())

			// Send response to user
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(ProxyResponse{
				false,
				"Error while copying original request body",
				"",
			})

			return
		}

		// Copy body from old request
		bodyCopy := io.NopCloser(bytes.NewBuffer(buf))

		// Create new request to API with same parameters but different endpoint
		newRequest, _ := http.NewRequest("POST", settings.ApiEndpoint, bodyCopy)

		// Set token inside header
		newRequest.Header.Set("Authorization", authenticationStatus.Token)
		newRequest.Header.Set("Content-Type", "application/json")
		fmt.Println("[GreenProxy] Added Authorization token to request header")

		// Send request
		resp, err := http.DefaultClient.Do(newRequest)

		if err != nil {
			fmt.Println("[GreenProxy] Error while forwarding request to API. ", err.Error())

			// Send response to user
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusServiceUnavailable)
			json.NewEncoder(w).Encode(ProxyResponse{
				false,
				"Error while forwarding request to API. Are you sure the API is running?",
				"",
			})

			return
		}

		// Try to convert response body to a string
		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			fmt.Println("[GreenProxy] Error while converting response body to string. ", err.Error())
		}
		bodyString := string(bodyBytes)

		// Send response to user
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(ProxyResponse{
			true,
			"Recieved successfully a response from API!",
			bodyString,
		})

		// Copy response to the client
		fmt.Println("[GreenProxy] Success. Response data sent successfully to client")
	} else {
		fmt.Println("[GreenProxy] Authentication failed. ", authenticationStatus.ErrorMessage)

		// Send response to user
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(ProxyResponse{
			false,
			authenticationStatus.ErrorMessage,
			"",
		})
	}
}

func StartProxy(route string, port int, proxySettings Proxy) error {
	// Add API handler with config
	http.Handle(proxySettings.ProxyRoute, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ProxyRequest(w, r, proxySettings)
	}))

	// Notify user the url to access the proxy
	fmt.Println("[GreenProxy] Proxy service started at http://" + route + ":" + fmt.Sprintf("%d", port) + proxySettings.ProxyRoute)

	// Create server instance
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: nil,
	}

	// Start server
	return server.ListenAndServe()
}
