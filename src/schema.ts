import { gql } from 'apollo-server'
import { GraphQLScalarType, Kind } from 'graphql'
import { Todo } from './models/todo'

export const typeDefs = gql`
  scalar Date

  type Query {
    hello: String!
    todos: [Todo!]!
    todo(id: ID!): Todo
    todosByTitle(titleRegex: String!): [Todo!]!
  }

  type Todo {
    id: ID!
    title: String!
    description: String
  }

  #  type User {
  #    id: ID!
  #    name: String!
  #    #stores: [Store!]!
  #    shoppingLists: [ShoppingList!]!
  #  }
  #
  #  type Store {
  #    id: ID!
  #    name: String!
  #    ingredients: [StoreIngredient!]!
  #  }
  #
  #  type ShoppingList {
  #    id: ID!
  #    name: String
  #    ingredients: [ShoppingListIngredient!]!
  #  }
  #
  #  type StoreIngredient {
  #    id: ID!
  #    store: Store!
  #    ingredient: Ingredient!
  #    aisle: String
  #  }
  #
  #  type ShoppingListIngredient {
  #    id: ID!
  #    ingredient: Ingredient!
  #    dateAdded: Date!
  #    dateCheckedOff: Date
  #  }
  #
  #  type Ingredient {
  #    id: ID!
  #    name: String!
  #  }
`

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime() // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value) // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
    }
    return null // Invalid hard-coded value (not an integer)
  },
})

export const resolvers = {
  Date: dateScalar,
  Query: {
    hello: () => 'Hello World!',
    todos: async () => Todo.find({}),
    todo: async ({}, { id }: { id: any }) => {
      return Todo.findById(id)
    },
    todosByTitle: async ({}, { titleRegex }: { titleRegex: any }) => {
      return Todo.find({ title: RegExp(titleRegex) })
    },
  },
}
