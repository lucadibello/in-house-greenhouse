package main

import (
	"context"
	"fmt"
	"greenproxy/config"
	"math/rand"

	"github.com/machinebox/graphql"
)

func main() {
	fmt.Println("[Test sending a GraphQL request to the proxy]")

	// Import config
	config := config.GetConfig("../config/config.yaml")

	// Build GraphQL client string (mapped to proxy)
	proxyURL := fmt.Sprintf("http://%s:%d/%s", config.Webserver.Hostname, config.Webserver.Port, config.Webserver.ProxyUrl)

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
	graphqlRequest.Var("greenhouseId", "a0eeb624-9dc5-4a13-b2e7-840c43f68189")

	// Add UUID to header
	graphqlRequest.Header.Add("X-Greenhouse-UUID", "a0eeb624-9dc5-4a13-b2e7-840c43f68189")

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
