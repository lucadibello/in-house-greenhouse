package proxy

import (
	"bytes"
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

var authenticationStatus authentication.AuthenticationResult = authentication.AuthenticationResult{
	Success: false,
	Token:   "",
}

// Handle an API request
func ProxyRequest(w http.ResponseWriter, r *http.Request, settings Proxy) {
	// Check if user has sent X-Greenhouse-UUID header
	if r.Header.Get("X-Greenhouse-UUID") == "" {
		// User has not sent X-Greenhouse-UUID header
		fmt.Println("[Proxy] User has not sent X-Greenhouse-UUID header")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Check if user has already a token saved inside global variable
	// If not, fetch a new one
	if !authenticationStatus.Success || authenticationStatus.Token == "" {
		// Save new status
		authenticationStatus = authentication.Authenticate(settings.ApiEndpoint, r.Header.Get("X-Greenhouse-UUID"))
	}

	// Check if authentication was successful
	if authenticationStatus.Success {
		// Create new request to API using same settings as the incoming one
		buf, err := ioutil.ReadAll(r.Body)

		if err != nil {
			fmt.Println("[Proxy] Error while reading request body:", err)
			io.WriteString(w, "Error while reading request body")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		// Copy body from old request
		bodyCopy := io.NopCloser(bytes.NewBuffer(buf))

		// Create new request to API with same parameters but different endpoint
		newRequest, _ := http.NewRequest(r.Method, settings.ApiEndpoint, bodyCopy)

		// Set token inside header

		fmt.Println("[Proxy] New authentication token: " + authenticationStatus.Token)
		newRequest.Header.Set("Authorization", authenticationStatus.Token)
		newRequest.Header.Set("Content-Type", "application/json")
		fmt.Println(newRequest)

		// Send request
		resp, err := http.DefaultClient.Do(newRequest)

		if err != nil {
			fmt.Println("Error while sending request:", err)
			return
		}
		// Copy response to the client
		io.Copy(w, resp.Body)
	} else {
		io.WriteString(w, "Authentication failed: "+authenticationStatus.ErrorMessage)
	}
}

func StartProxy(route string, port int, proxySettings Proxy) error {
	// Add API handler with config
	http.Handle(proxySettings.ProxyRoute, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ProxyRequest(w, r, proxySettings)
	}))

	// Notify user the url to access the proxy
	fmt.Println("Proxy service started at http://" + route + ":" + fmt.Sprintf("%d", port) + proxySettings.ProxyRoute)

	// Create server instance
	server := &http.Server{
		Addr:    fmt.Sprintf("%s:%d", route, port),
		Handler: nil,
	}

	// Start server
	return server.ListenAndServe()
}
