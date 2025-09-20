import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '1234',
  database: process.env.POSTGRES_DB || 'mockbasin',
})

export default defineEventHandler(async (event) => {
  try {
    const result = await pool.query('SELECT * FROM basinwaterlevel')
    return result.rows
  } catch (error) {
    return { error: 'Database error', details: error }
  }
})
