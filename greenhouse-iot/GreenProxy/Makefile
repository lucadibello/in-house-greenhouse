build:
	go build -o bin/green-proxy green-proxy.go

run:
	go run green-proxy.go

compile:
	echo "Compiling for every OS and Platform"
	GOOS=linux GOARCH=arm go build -o bin/green-proxy-main-linux-arm green-proxy.go
	GOOS=linux GOARCH=arm64 go build -o bin/green-proxy-main-linux-arm64 green-proxy.go
	GOOS=freebsd GOARCH=386 go build -o bin/green-proxy-main-freebsd-386 green-proxy.go

all: compile