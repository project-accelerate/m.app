import { Service } from 'typedi'
import { AMQPConnection } from './AMQPConnection'

@Service()
export class EventDispatcher {
  constructor(private connection: AMQPConnection) {}

  async dispatch(message: object) {
    const payload = Buffer.from(JSON.stringify(message))
    this.connection.publish(message.constructor.name, payload)
  }
}
