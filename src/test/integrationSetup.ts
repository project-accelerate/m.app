import 'reflect-metadata'
import { configureDb } from '../config/db';

beforeAll(configureDb)
