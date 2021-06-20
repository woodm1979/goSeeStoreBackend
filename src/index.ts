import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

import { resolvers, typeDefs } from './schema'
import { Todo, TodosDataSource } from './models/todo'

mongoose.connect(
  'mongodb://127.0.0.1:27017/goSeeStore?compressors=zlib&gssapiServiceName=mongodb',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to database')
  }
)

const dataSources = () => ({
  todos: new TodosDataSource(Todo),
})

// GraphQL server
const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})
graphQLServer.listen({ port: 4000, path: '/graphql' }).then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
  `)
})
