import * as glob from 'glob'
import { Container } from 'typedi'
import { AMQPConnection } from 'backend/app/common/external/amqp/AMQPConnection'

interface FindEventListenerProps {
  searchPath: string
  url: string
}

export async function initEventListeners({
  searchPath,
  url,
}: FindEventListenerProps) {
  glob.sync(searchPath).forEach(file => {
    require(file)
  })

  await Container.get<AMQPConnection>(AMQPConnection).init(url)
}
