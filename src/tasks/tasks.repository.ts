import { Task } from './tasks.entity'
import { TaskStatus } from './tasks-status.enum'
import { CreateTaskDto } from './dto/create-task.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

export class TasksRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {
    const { target, manager, queryRunner } = tasksRepository
    super(target, manager, queryRunner)
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto

    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      )
    }

    const tasks = await query.getMany()

    return tasks
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
