import { Container } from 'typedi'
import { Message } from 'amqplib'

const LISTENERS = Symbol('LISTENERS')

interface Listener {
  id: string
  event: string
  handler: (message: Message) => Promise<void>
}

export function EventListener(type: Function): MethodDecorator {
  return (proto: any, key) => {
    getEventListeners(proto.constructor).push({
      id: [proto.constructor.name, key].join('.'),
      event: type.name,
      handler: (msg: Message) => {
        const handler = Container.get<any>(proto.constructor)
        return handler[key](JSON.parse(msg.content.toString()))
      },
    })
  }
}

export function getEventListeners(constructor: any): Listener[] {
  if (typeof constructor !== 'function') {
    return []
  }

  const listeners = constructor[LISTENERS] || []
  constructor[LISTENERS] = listeners

  return listeners
}
