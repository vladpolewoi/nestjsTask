import { Module } from '@nestjs/common'
import { TasksModule } from './tasks/tasks.module'
import { TypeOrmModule } from '@nestjs/typeorm'

import { options } from './data-source'

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(options)],
})
export class AppModule {}
