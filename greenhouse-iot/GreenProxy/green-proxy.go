package main

import (
	"fmt"
	"greenproxy/config"
	"greenproxy/proxy"
)

// Main function
func main() {
	// Load config using config package
	config := config.GetConfig()
	fmt.Println("Starting proxy service...")

	// Start proxy service
	err := proxy.StartProxy(config.Webserver.Hostname, config.Webserver.Port, config.Webserver.ApiPath)

	// Check if started successfully
	if err != nil {
		fmt.Println("Error while starting proxy service:", err)
	}
}
