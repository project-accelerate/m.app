import { Service } from 'typedi'
import { EventListener } from '../../EventListener'

export class PubSubExampleMessage {
  constructor(props: PubSubExampleMessage) {
    Object.assign(this, props)
  }

  readonly id!: string
}

export class PubSubOtherExampleMessage {
  constructor(props: PubSubOtherExampleMessage) {
    Object.assign(this, props)
  }

  readonly id!: string
}

@Service()
export class PubSubListener {
  @EventListener(PubSubExampleMessage)
  listener1(message: PubSubExampleMessage) {}

  @EventListener(PubSubExampleMessage)
  listener2(message: PubSubExampleMessage) {}
}
