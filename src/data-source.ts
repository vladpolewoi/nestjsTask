import { DataSource, DataSourceOptions } from 'typeorm'

export const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'task-management',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
}

export const AppDataSource = new DataSource(options)
