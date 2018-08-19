import log from 'winston'
import { Service } from 'typedi'
import { TaskType } from './TaskType'
import { AppMetrics } from 'backend/util/Metrics'

interface Task {
  type: TaskType
  handler: () => Promise<void>
  name: string
}

@Service()
export class TaskRunner {
  private taskMap = new Map<TaskType, Task[]>()

  constructor(private metrics: AppMetrics) {}

  async run(type: string) {
    if (!this.isValidType(type)) {
      log.error(
        `[TaskRunner] Invalid task type ${type}. Valid task types are:\n${this.validTypes.join()}`,
      )
    }

    for (const task of this.getTasksForType(type as TaskType)) {
      log.info(`[TaskRunner]: Running ${task.name}`)
      await this.metrics.measureTime(task.name, () => task.handler())
      log.info(`[TaskRunner]: Completed ${task.name}`)
    }
  }

  addTask(task: Task) {
    this.getTasksForType(task.type).push(task)
    log.info(`[TaskRunner]: Registered scheduled task ${task.name}`)
  }

  private get validTypes() {
    return Object.keys(TaskType)
  }

  private isValidType(type: string): type is TaskType {
    return type in TaskType
  }

  private getTasksForType(type: TaskType) {
    let tasks = this.taskMap.get(type)
    if (!tasks) {
      tasks = []
      this.taskMap.set(type, tasks)
    }

    return tasks
  }
}
