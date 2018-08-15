import { Container } from 'typedi'
import log from 'winston'
import { AMQPConnection } from './AMQPConnection'

export function EventListener(type: Function): MethodDecorator {
  const connection = Container.get<AMQPConnection>(AMQPConnection)

  return (proto: any, key) => {
    const subscriber = Container.get<any>(proto.constructor)
    const subscriptionKey = [proto.constructor.name, key].join('.')

    connection.subscribe(type.name, subscriptionKey, message => {
      const decodedMessage = JSON.parse(message.content.toString())
      subscriber[key](decodedMessage)
    })
  }
}
