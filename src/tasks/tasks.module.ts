import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { TaskRepositry } from './tasks.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepositry])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
