import mongoose from 'mongoose'
import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb'

import { DataSourceContext } from './interfaces'

export interface ITodo {
  title: string
  description: string
}

export interface TodoDoc extends mongoose.Document {
  title: string
  description: string
}

interface TodoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: ITodo): TodoDoc
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

todoSchema.statics.build = (attr: ITodo) => {
  return new Todo(attr)
}

export const Todo = mongoose.model<any, TodoModelInterface>('Todo', todoSchema)

export class TodosDataSource extends MongoDataSource<
  TodoDoc,
  DataSourceContext
> {
  getTodo(todoId: ObjectId) {
    // This method is likely not useful in it's current state.
    // Right now it's a pass-through to this.findOneById, but
    // in the future, we'll add authorization and the like here.
    //
    // Should likely add a similar method for todosByTitle
    //
    // this.context has type `Context` as defined above
    // this.findOneById has type `(id: ObjectId) => Promise<TodoDoc | null | undefined>`
    return this.findOneById(todoId)
  }
}
