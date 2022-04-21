# syntax=docker/dockerfile:1

FROM golang:1.16-alpine

# Setup work directory
WORKDIR /app

# Copy the dependencies
COPY go.mod ./
COPY go.sum ./

# Download all dependencies
RUN go mod download

# Copy source code + packages
COPY green-proxy.go ./
COPY authentication ./authentication
COPY config ./config
COPY proxy ./proxy
COPY test ./test

# Build green-prody
RUN go build -o /greenproxy

# Port where the proxy will be exposed
EXPOSE 6864

# Execute proxy
CMD [ "/greenproxy" ]
