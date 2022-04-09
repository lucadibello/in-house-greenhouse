import {
  asNexusMethod,
  makeSchema
} from 'nexus'
import { join } from 'path'
import { DateTimeResolver } from 'graphql-scalars'
import * as types from './graphql'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname,'/graphql/generated/schema.graphql'),
    typegen: join(__dirname,'/graphql/generated/nexus.ts'),
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
