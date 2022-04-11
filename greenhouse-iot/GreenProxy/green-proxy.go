package main

import (
	"fmt"
	"greenproxy/config"
	"greenproxy/proxy"
)

// Main function
func main() {
	// Load config using config package
	config := config.GetConfig("config/config.yaml")
	fmt.Println("Starting proxy service...")

	// Start proxy service
	err := proxy.StartProxy(config.Webserver.Hostname, config.Webserver.Port, proxy.Proxy{
		ProxyRoute:  config.Webserver.ProxyUrl,
		ApiEndpoint: config.Endpoints.Api,
	})

	// Check if started successfully
	if err != nil {
		fmt.Println("Error while starting proxy service:", err)
	}
}
