import * as glob from 'glob'
import { Container } from 'typedi'
import { AMQPConnection } from 'backend/app/common/external/amqp/AMQPConnection'
import { scanPaths } from '../../../../../node_modules/backend/util/scanPaths'

interface FindEventListenerProps {
  searchPath: string
  url: string
}

export async function initEventListeners({
  searchPath,
  url,
}: FindEventListenerProps) {
  scanPaths(searchPath)
  await Container.get<AMQPConnection>(AMQPConnection).init(url)
}
