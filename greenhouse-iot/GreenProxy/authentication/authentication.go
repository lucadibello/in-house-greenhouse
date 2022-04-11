package authentication

import (
	"fmt"
	"net/http"
)

// Authentication struct
type AuthenticationResult struct {
	Success bool
	Token   string
}

// Authenticate function
func Authenticate(endpoint string, UUID string) AuthenticationResult {
	fmt.Println("Fetching temporary token for operation on greenhouse ", UUID)

	// Send request to endpoint with data
	response, err := http.Post(endpoint, "application/json", nil)

	// Read response

	// Check if error
	if err == nil {
		// Print response
		fmt.Println("Authentication response:", response)

		// Return success status with token
		return AuthenticationResult{true, ""}
	} else {
		fmt.Println("Error while fetching temporary token:", err)
		panic(err)
		// Error found
		return AuthenticationResult{false, ""}
	}
}
