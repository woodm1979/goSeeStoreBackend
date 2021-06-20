import { ObjectId } from 'mongodb'

import { TodosDataSource } from './models/todo'

export interface DataSourceContext {
  // loggedInUser: UserDocument
}

export interface Context extends DataSourceContext {
  dataSources: {
    todos: TodosDataSource
  }
}

export interface IdArg {
  id: ObjectId
}

export interface TitleArg {
  title: string
}
