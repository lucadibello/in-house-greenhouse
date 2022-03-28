// Configure dotenv before any other imports
require('dotenv').config()

import { ApolloServer } from 'apollo-server'
import { schema } from './api/schema'
import { context } from './api/context'

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
