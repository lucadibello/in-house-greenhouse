package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Webserver struct {
		Hostname string `yaml:"hostname"`
		Port     int    `yaml:"port"`
		ProxyUrl string `yaml:"proxyUrl"`
	}
	Endpoints struct {
		Api string `yaml:"api"`
	}
}

func GetConfig(configFilePath string) Config {
	// Read config file contents
	data, err := os.ReadFile(configFilePath)

	if err == nil {
		// Create empty struct
		conf := Config{}

		// Parse config file and load it into the struct
		yaml.Unmarshal(data, &conf)
		// Return the config
		return conf
	} else {
		fmt.Println("[!] Error while reading config file", err)
		panic(err)
	}
}
