package main

import (
	"context"
	"fmt"
	"greenproxy/config"
	"math/rand"

	"github.com/machinebox/graphql"
)

func main() {
	fmt.Println("--- Test sending a GraphQL request to the proxy ---")
	fmt.Println()

	// Import config
	config := config.GetConfig("../config/config.yaml")

	// Build GraphQL client string (mapped to proxy)
	proxyURL := fmt.Sprintf("http://%s:%d%s", config.Webserver.Hostname, config.Webserver.Port, config.Webserver.ProxyUrl)

	// Print url
	fmt.Println("[TEST] Using proxy URL:", proxyURL)

	// create graphql client
	graphqlClient := graphql.NewClient(proxyURL)

	// create graphql record API request
	graphqlRequest := graphql.NewRequest(`
		mutation RecordData($sensor: String!, $value: Float!, $greenhouseId: String!) {
			recordData(sensor: $sensor, value: $value, greenhouseId: $greenhouseId) {
				id
				sensor
				value
				greenhouseId
				created_at
				updated_at
			}
		}
	`)

	// add variables to request
	graphqlRequest.Var("sensor", "SOIL_SENSOR_1")
	graphqlRequest.Var("value", rand.Float32())
	graphqlRequest.Var("greenhouseId", "cd8918aa-8ead-4ed0-83df-2b227ad939e0")

	// Add UUID to header
	graphqlRequest.Header.Add("X-Greenhouse-UUID", "cd8918aa-8ead-4ed0-83df-2b227ad939e0")

	var graphqlResponse interface{}
	ctx := context.Background()
	graphqlClient.Log = func(s string) {
		fmt.Println(s)
	}

	if err := graphqlClient.Run(ctx, graphqlRequest, &graphqlResponse); err != nil {
		fmt.Println("Error while sending request:", err)
	} else {
		fmt.Println("Response:", graphqlResponse)
	}
}
