import 'reflect-metadata'
import { join } from 'path'
import dotenv from 'dotenv'
import { configureDb } from './config/db'

dotenv.config({ path: join(__dirname, '..', 'config', 'public.env') })
dotenv.config({ path: join(__dirname, '..', 'config', '.env') })

beforeAll(configureDb)
