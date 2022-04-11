package authentication

import (
	"context"
	"fmt"

	"github.com/machinebox/graphql"
)

// Authentication struct
type AuthenticationResult struct {
	Success      bool
	Token        string
	ErrorMessage string
}

type GraphQLResponse struct {
	GreenhouseAuth struct {
		Token        string `json:"token"`
		Expire       string `json:"expire"`
		Issued       string `json:"issued"`
		ErrorCode    string `json:"errorCode"`
		ErrorMessage string `json:"errorMessage"`
	} `json:"greenhouseAuth"`
}

// Authenticate function
func Authenticate(endpoint string, UUID string) AuthenticationResult {
	fmt.Println("Fetching temporary token for operation on greenhouse ", UUID)

	// Create graphql client
	graphqlClient := graphql.NewClient(endpoint)
	graphqlRequest := graphql.NewRequest(`
		query authentication($greenhouseId: String!) {
			greenhouseAuth(greenhouseId: $greenhouseId) {
				token
				expire
				issued
				errorCode
				errorMessage
			}
		}
	`)

	// Set usefull headers
	graphqlRequest.Header.Set("Cache-Control", "no-cache")

	// Add UUID variable to request
	graphqlRequest.Var("greenhouseId", UUID)

	// Send request
	var graphqlResponse GraphQLResponse
	ctx := context.Background()
	if err := graphqlClient.Run(ctx, graphqlRequest, &graphqlResponse); err != nil {
		// Graphql request failed
		return AuthenticationResult{
			Success:      false,
			Token:        "",
			ErrorMessage: err.Error(),
		}
	}

	// Check GraphQL response status
	if graphqlResponse.GreenhouseAuth.ErrorCode != "" {
		// GraphQL returned an error
		return AuthenticationResult{
			Success:      false,
			Token:        "",
			ErrorMessage: graphqlResponse.GreenhouseAuth.ErrorMessage,
		}
	} else {
		// GraphQL returned a token
		return AuthenticationResult{
			Success:      true,
			Token:        graphqlResponse.GreenhouseAuth.Token,
			ErrorMessage: "",
		}
	}
}
