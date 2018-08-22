import './config/environment'
import { join } from 'path'
import dotenv from 'dotenv'
import { Container } from 'typedi'
import { ExpoPushClient } from 'backend/app/device/external/ExpoPushClient'
import { FakeExpoPushClient } from 'backend/app/device/external/FakeExpoPushClient'
import { configureDb } from './config/db'
import { configurePubsub } from 'backend/config/pubsub'

dotenv.config({ path: join(__dirname, '..', 'config', 'public.env') })
dotenv.config({ path: join(__dirname, '..', 'config', '.env') })

beforeAll(async () => {
  Container.set(ExpoPushClient, new FakeExpoPushClient())
  await configureDb()
  await configurePubsub({ subscribeWorkers: true })
})
