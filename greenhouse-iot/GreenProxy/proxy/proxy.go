package proxy

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"

	"greenproxy/authentication"
	"net/http"
)

type Proxy struct {
	ProxyRoute  string
	ApiEndpoint string
}

// Handle an API request
func ProxyRequest(w http.ResponseWriter, r *http.Request, settings Proxy) {
	// Notify that the request is being processed
	// fmt.Println("[GreenProxy] Request received:", r.Method, r.URL.Path)

	// Check if user has sent X-Greenhouse-UUID header
	if r.Header.Get("X-Greenhouse-UUID") == "" {
		// User has not sent X-Greenhouse-UUID header
		fmt.Println("[GreenProxy] User has not sent X-Greenhouse-UUID header")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Save new status
	fmt.Println("[GreenProxy] Request new authentication token for request")
	authenticationStatus := authentication.Authenticate(settings.ApiEndpoint, r.Header.Get("X-Greenhouse-UUID"))
	fmt.Println()

	// Check if authentication was successful
	if authenticationStatus.Success {
		// Create new request to API using same settings as the incoming one
		buf, err := ioutil.ReadAll(r.Body)

		if err != nil {
			fmt.Println("[GreenProxy] Error while copying original request body. ", err.Error())
			io.WriteString(w, "Error while reading request body")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		// Copy body from old request
		bodyCopy := io.NopCloser(bytes.NewBuffer(buf))

		// Create new request to API with same parameters but different endpoint
		newRequest, _ := http.NewRequest("POST", settings.ApiEndpoint, bodyCopy)

		// Set token inside header
		newRequest.Header.Set("Authorization", authenticationStatus.Token)
		newRequest.Header.Set("Content-Type", "application/json")
		fmt.Println("[GreenProxy] Added Authorization token to request header")

		// Send request
		resp, err := http.DefaultClient.Do(newRequest)

		if err != nil {
			fmt.Println("[GreenProxy] Error while forwarding request to API. ", err.Error())
			return
		}
		// Copy response to the client
		fmt.Println("[GreenProxy] Success. Response data sent successfully to client")
		io.Copy(w, resp.Body)
	} else {
		fmt.Println("[GreenProxy] Authentication failed. ", authenticationStatus.ErrorMessage)
	}
}

func StartProxy(route string, port int, proxySettings Proxy) error {
	// Add API handler with config
	http.Handle(proxySettings.ProxyRoute, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ProxyRequest(w, r, proxySettings)
	}))

	// Notify user the url to access the proxy
	fmt.Println("[GreenProxy] Proxy service started at http://" + route + ":" + fmt.Sprintf("%d", port) + proxySettings.ProxyRoute)

	// Create server instance
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: nil,
	}

	// Start server
	return server.ListenAndServe()
}
