# syntax=docker/dockerfile:1

#
# Build stage
#
FROM node:18-alpine as builder

# Create base file structure
RUN mkdir -p /home/greenhouse-server && chown -R node:node /home/greenhouse-server
WORKDIR /home/greenhouse-server
USER node

# Install dependencies
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json tsconfig.json
RUN yarn install --production

# Copy source code
COPY src src
COPY prisma prisma
COPY .env .env

# Build project
RUN yarn build
