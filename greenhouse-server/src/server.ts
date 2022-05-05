// Configure dotenv before any other imports
require('dotenv').config()

import { ApolloServer } from 'apollo-server'
import { schema } from './api/schema'
import { context } from './api/context'


// Create Apollo Server
const server = new ApolloServer({
  schema: schema,
  context: req => {
    return context(req)
  }
})
// Check if API server url and port are set in .env, otherwise set default settings
const port = process.env.API_SERVER_PORT || 4000
const url = process.env.API_SERVER_URL || 'localhost'

// Start listening
server.listen({
  host: url,
  port: port
}).then(async ({ url }) => {
  console.log(`\
    🌳 Greenhouse Server ready at: ${url}
  `)
})
