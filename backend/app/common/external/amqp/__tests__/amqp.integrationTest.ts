import { Container } from 'typedi'
import { delay } from 'bluebird'
import { initEventListeners } from '../findEventListeners'
import { EventDispatcher } from '../EventDispatcher'
import {
  PubSubExampleMessage,
  PubSubOtherExampleMessage,
  PubSubListener,
} from './examples/PubSubListenerExample'
import { ConfigService } from 'backend/app/common/ConfigService'

describe('amqp', () => {
  const config = Container.get<ConfigService>(ConfigService)

  beforeAll(async () => {
    await initEventListeners({
      searchPath: `${__dirname}/examples/*.ts`,
      url: config.get('CLOUDAMQP_URL'),
      subscribeWorkers: true,
    })
  })

  describe('pub/sub listener', () => {
    it('should dispatch to all listeners', async () => {
      const dispatcher = Container.get<EventDispatcher>(EventDispatcher)
      const listener = Container.get<PubSubListener>(PubSubListener)

      spyOn(listener, 'listener1')
      spyOn(listener, 'listener2')

      const message = new PubSubExampleMessage({ id: '123' })
      dispatcher.dispatch(message)

      await waitForMessage()

      expect(listener.listener1).toHaveBeenCalledWith(message)

      expect(listener.listener2).toHaveBeenCalledWith(message)
    })

    it('should not dispatch to other message’s listeners', async () => {
      const dispatcher = Container.get<EventDispatcher>(EventDispatcher)
      const listener = Container.get<PubSubListener>(PubSubListener)

      spyOn(listener, 'listener1')

      const message = new PubSubOtherExampleMessage({ id: '123' })
      dispatcher.dispatch(message)

      await waitForMessage()

      expect(listener.listener1).not.toHaveBeenCalled()
    })
  })
})

function waitForMessage() {
  return delay(2_000)
}
