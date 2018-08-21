import { initEventListeners } from 'backend/app/common/external/amqp/findEventListeners'
import { Container } from 'typedi'
import { ConfigService } from 'backend/app/common/ConfigService'

export async function configurePubsub(opts: { disable?: boolean } = {}) {
  if (opts.disable) {
    return
  }

  const config = Container.get<ConfigService>(ConfigService)

  await initEventListeners({
    searchPath: `${__dirname}/../app/*/*/*.ts`,
    url: config.get('CLOUDAMQP_URL'),
  })
}
