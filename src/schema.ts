import { gql } from 'apollo-server'
import { GraphQLScalarType, Kind } from 'graphql'

import { Context, IdArg, TitleArg } from './interfaces'
import { Todo, ITodo } from './models/todo'

export const typeDefs = gql`
  scalar Date

  type Query {
    hello: String!
    todos: [Todo!]!
    todo(id: ID!): Todo
    todosByTitle(title: String!): [Todo!]!
  }

  type Todo {
    id: ID!
    title: String!
    description: String!
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

  type Mutation {
    createTodo(title: String!, description: String): Todo
  }
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
    todo: async (_: any, args: IdArg, context: Context) =>
      context.dataSources.todos.getTodo(args.id),
    todosByTitle: async (_: any, { title }: TitleArg, context: Context) =>
      context.dataSources.todos.findByFields({ title }),
  },
  Mutation: {
    createTodo: async (_: any, args: ITodo) => {
      const { title, description } = args
      const todo = Todo.build({ title, description })
      await todo.save()
      return todo
    },
  },
}
