import { Container } from 'typedi'
import { AMQPConnection } from 'backend/app/common/external/amqp/AMQPConnection'
import { scanPaths } from 'backend/util/scanPaths'

interface FindEventListenerProps {
  searchPath: string
  url: string
}

export async function initEventListeners({
  searchPath,
  url,
}: FindEventListenerProps) {
  const appObjects = scanPaths(searchPath)
  await Container.get<AMQPConnection>(AMQPConnection).init(url, appObjects)
}
