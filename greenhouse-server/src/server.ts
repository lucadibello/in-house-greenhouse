import { ApolloServer } from 'apollo-server'
import { schema } from './api/schema'
import { context } from './api/context'

// Configure dotenv
require('dotenv').config()

// Create Apollo Server
const server = new ApolloServer({
  schema: schema,
  context: context,
})

// Start listening
server.listen().then(async ({ url }) => {
  console.log(`\
    🌳 Greenhouse Server ready at: ${url}
  `)
})
