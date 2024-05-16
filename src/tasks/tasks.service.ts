import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { Task } from './tasks.entity'
import { TasksRepository } from './tasks.repository'
import { TaskStatus } from './tasks-status.enum'
import { User } from 'src/auth/user.entity'

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) { }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user)
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id })

    if (!found) {
      throw new NotFoundException('Task not found')
    }

    return found
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user)
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException('Task not found')
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)

    task.status = status
    await this.tasksRepository.save(task)

    return task
  }
}
