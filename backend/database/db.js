import postgres from 'postgres'
import {env} from '../src/config/env.js'

const connectionString = env.DATABASE_URL
const sql = postgres(connectionString, {max_prepared: 0})

export default sql