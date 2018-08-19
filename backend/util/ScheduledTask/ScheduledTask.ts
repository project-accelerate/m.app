import { Container } from 'typedi'
import { TaskRunner } from './TaskRunner'
import { TaskType } from './TaskType'

export function ScheduledTask(type: TaskType): MethodDecorator {
  return (parent: any, key) => {
    Container.get<TaskRunner>(TaskRunner).addTask({
      type,
      name: `${parent.constructor.name}.${key.toString()}`,
      handler: async () => {
        const service = Container.get<any>(parent.constructor)
        await service[key]()
      },
    })
  }
}
