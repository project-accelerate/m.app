import { Message } from 'amqplib'
import { AMQPConnection } from './AMQPConnection'

export class MockAMQPConnection implements Partial<AMQPConnection> {
  private subscribers = new Map<string, Array<(message: Message) => void>>()
  async init() {}

  async publish(event: string, message: Buffer) {
    const subscribers = this.subscribers.get(event) || []

    await Promise.all(
      subscribers.map(s =>
        s({
          content: message,
          fields: {} as any,
          properties: {} as any,
        }),
      ),
    )
  }

  subscribe(
    event: string,
    listenerKey: string,
    cb: (message: Message) => void,
  ) {
    const subscribers = this.subscribers.get(event) || []

    subscribers.push(cb)
    this.subscribers.set(event, subscribers)
  }
}
