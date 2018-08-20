import 'reflect-metadata'
import { join } from 'path'
import dotenv from 'dotenv'
import { configureDb } from './config/db'
import { Container } from 'typedi'
import { AMQPConnection } from 'backend/app/common/external/amqp/AMQPConnection'
import { MockAMQPConnection } from 'backend/app/common/external/amqp/MockAMQPConnection'
import { ExpoPushClient } from 'backend/app/device/external/ExpoPushClient'
import { mock } from 'ts-mockito'

dotenv.config({ path: join(__dirname, '..', 'config', 'public.env') })
dotenv.config({ path: join(__dirname, '..', 'config', '.env') })

Container.set(AMQPConnection, new MockAMQPConnection())
Container.set(ExpoPushClient, mock(ExpoPushClient))

beforeAll(configureDb)
