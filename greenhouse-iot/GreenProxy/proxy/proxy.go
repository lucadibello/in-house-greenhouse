package proxy

import (
	"fmt"
	"io"

	"greenproxy/authentication"
	"net/http"
)

var authenticationStatus authentication.AuthenticationResult = authentication.AuthenticationResult{
	Success: false,
	Token:   "",
}

// Handle an API request
func HandleApiRequest(w http.ResponseWriter, r *http.Request) {
	// Check if user has already a token saved inside global variable
	// If not, fetch a new one
	if authenticationStatus.Success {
		// Save new status
		authenticationStatus = authentication.Authenticate("http://greenhouse.local/api/v1/authenticate", "")
	}
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
}

func StartProxy(route string, port int, accessPoint string) error {
	// Add API handler
	http.Handle(accessPoint, http.HandlerFunc(HandleApiRequest))

	// Notify user the url to access the proxy
	fmt.Println("Proxy service started at http://" + route + ":" + fmt.Sprintf("%d", port) + accessPoint)

	// Create server instance
	server := &http.Server{
		Addr:    fmt.Sprintf("%s:%d", route, port),
		Handler: nil,
	}

	// Start server
	return server.ListenAndServe()
}
