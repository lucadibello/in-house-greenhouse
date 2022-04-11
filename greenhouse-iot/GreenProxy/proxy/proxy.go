package proxy

import (
	"fmt"
	"io"

	"greenproxy/authentication"
	"net/http"
)

type Proxy struct {
	ProxyRoute             string
	AuthenticationEndpoint string
}

var authenticationStatus authentication.AuthenticationResult = authentication.AuthenticationResult{
	Success: false,
	Token:   "",
}

// Handle an API request
func ProxyRequest(w http.ResponseWriter, r *http.Request, settings Proxy) {
	// Check if user has already a token saved inside global variable
	// If not, fetch a new one
	if !authenticationStatus.Success || authenticationStatus.Token == "" {
		// Save new status
		authenticationStatus = authentication.Authenticate(settings.AuthenticationEndpoint, "")
	}

	// Check if authentication was successful
	if authenticationStatus.Success {
		// Set token to request header
		r.Header.Set("Authorization", authenticationStatus.Token)
		// Set content type to application/json
		r.Header.Set("Content-Type", "application/json")
		// Send request with modifed header to greenhouse APIs
		response, err := http.DefaultClient.Do(r)

		// Return response to client
		if err == nil {
			io.Copy(w, response.Body)
		} else {
			fmt.Println("Error while fetching response:", err)
		}
	} else {
		io.WriteString(w, "Authentication failed")
	}
}

func StartProxy(route string, port int, proxySettings Proxy) error {
	// print proxy settings
	fmt.Println("Proxy settings:")
	fmt.Println("Proxy route:", proxySettings.ProxyRoute)
	fmt.Println("Authentication endpoint:", proxySettings.AuthenticationEndpoint)

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
