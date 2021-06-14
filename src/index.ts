import { ApolloServer } from 'apollo-server'
import { json } from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'

import { todoRouter } from './routes/todo'
import { resolvers, typeDefs } from './schema'

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

// Express REST server
const app = express()
app.use(json())
app.use(todoRouter)
app.listen(3000, () => {
  console.log('REST server is listening on port 3000')
})

// GraphQL server
const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
})
graphQLServer.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
  `)
})
