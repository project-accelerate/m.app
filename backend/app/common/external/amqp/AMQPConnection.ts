import { connect, Connection, Channel, Message } from 'amqplib'
import { delay } from 'bluebird'
import { Service } from 'typedi'
import log from 'winston'
import { getEventListeners } from 'backend/app/common/external/amqp/EventListener'
@Service()
export class AMQPConnection {
  private connection!: Connection
  private channel!: Channel
  private registeredSubscribers = new Set<string>()
  private knownExchanges = new Set<string>()

  async init(url: string, listenerExports: unknown[]) {
    await this.connect(url)
    this.channel = await this.connection.createChannel()

    await Promise.all(
      listenerExports.flatMap(cls =>
        getEventListeners(cls).flatMap(({ id, event, handler }) =>
          this.subscribe(event, id, handler),
        ),
      ),
    )

    log.info('[AMQP] initialization completed')
  }

  private async connect(url: string) {
    await tryWithTimeout(30_000, async () => {
      this.connection = await connect(url)
    })

    this.connection.on('error', err => {
      if (err.message !== 'Connection closing') {
        log.error('[AMQP] conn error', err.message)
      }
    })

    this.connection.on('close', () => {
      log.error('[AMQP] reconnecting')
      this.connect(url)
    })

    log.info('[AMQP] connected')
  }

  async publish(event: string, message: Buffer) {
    if (!this.channel) {
      throw Error(`[AMQP] cannot publish before initialization`)
    }

    log.info(`[AMQP] publish ${event}`)

    this.assertPubSubExchange(event)
    this.channel.publish(event, '', message)
  }

  async subscribe(
    event: string,
    listenerKey: string,
    cb: (mesage: Message) => void,
  ) {
    if (!this.channel) {
      throw Error(`[AMQP] cannot subscribe before initialization`)
    }

    log.info(`[AMQP] Subscribe ${listenerKey} to ${event}`)

    this.assertPubSubExchange(event)
    await this.channel.assertQueue(listenerKey)
    await this.channel.bindQueue(listenerKey, event, '')

    const subscriptionKey = [event, listenerKey].join(':')

    if (this.registeredSubscribers.has(subscriptionKey)) {
      throw Error(`[AMQP] ${listenerKey} already registered for event ${event}`)
    }

    this.channel.consume(listenerKey, async message => {
      log.info(`[AMQP] ${listenerKey} handling ${event}`)

      if (!message) {
        return
      }

      try {
        cb(message)
      } finally {
        this.channel.ack(message)
      }
    })
  }

  private async assertPubSubExchange(event: string) {
    if (!this.knownExchanges.has(event)) {
      await this.channel.assertExchange(event, 'fanout', { durable: false })
      this.knownExchanges.add(event)
    }
  }
}

async function tryWithTimeout(timeout: number, cb: () => Promise<void>) {
  const deadline = Date.now() + timeout
  let interval = 100

  while (Date.now() < deadline) {
    try {
      await cb()
      return
    } catch {
      await delay(interval)
      interval = interval * 2
    }
  }

  throw Error('Connection timed out')
}
