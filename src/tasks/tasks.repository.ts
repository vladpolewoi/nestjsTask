import { Task } from './tasks.entity'
import { TaskStatus } from './tasks-status.enum'
import { CreateTaskDto } from './dto/create-task.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

export class TasksRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {
    const { target, manager, queryRunner } = tasksRepository
    super(target, manager, queryRunner)
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    })

    await this.save(task)

    return task
  }
}
