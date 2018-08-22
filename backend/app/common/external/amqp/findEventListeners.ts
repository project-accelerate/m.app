import { Container } from 'typedi'
import { AMQPConnection } from 'backend/app/common/external/amqp/AMQPConnection'
import { scanPaths } from 'backend/util/scanPaths'

interface FindEventListenerProps {
  searchPath: string
  url: string
  subscribeWorkers: boolean
}

export async function initEventListeners({
  searchPath,
  url,
  subscribeWorkers,
}: FindEventListenerProps) {
  const potentialWorkerClasses = subscribeWorkers ? scanPaths(searchPath) : []
  await Container.get<AMQPConnection>(AMQPConnection).init(
    url,
    potentialWorkerClasses,
  )
}
