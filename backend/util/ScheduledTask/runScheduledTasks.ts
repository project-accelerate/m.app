import { Container } from 'typedi'
import { TaskRunner } from './TaskRunner'
import { TaskType } from './TaskType'
import { scanPaths } from '../scanPaths'

interface RunScheduledTasksProps {
  searchPath: string
  type: string
}

export async function runScheduledTasks({
  searchPath,
  type,
}: RunScheduledTasksProps) {
  scanPaths(searchPath)
  await Container.get<TaskRunner>(TaskRunner).run(type)
}
