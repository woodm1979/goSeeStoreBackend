import { ObjectId } from 'mongodb'

import { TodosDataSource } from './models/todo'
import { DataSourceContext } from './models/interfaces'

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
