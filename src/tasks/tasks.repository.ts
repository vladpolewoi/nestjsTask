import { Repository } from 'typeorm'
import { Task } from './tasks.entity'

export class TaskRepositry extends Repository<Task> {}
