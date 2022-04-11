package main

import (
	"fmt"
	"greenproxy/config"
	"greenproxy/proxy"
)

// Main function
func main() {
	// Load config using config package
	fmt.Println("[Config] Loading config file...")
	config := config.GetConfig("config/config.yaml")

	// Print loaded config
	fmt.Println("\n[Config] Proxy config:")
	fmt.Println("[Config]	- Port:", config.Webserver.Port)
	fmt.Println("[Config]	- Hostname:", config.Webserver.Hostname)
	fmt.Println("[Config]	- Proxy route:", config.Webserver.ProxyUrl)
	fmt.Println("[Config]	- API endpoint:", config.Endpoints.Api)
	fmt.Println()

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
