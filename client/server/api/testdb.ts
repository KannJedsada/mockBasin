import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
})

export default defineEventHandler(async (event) => {
  try {
    const result = await pool.query(`
      SELECT * FROM basinwaterlevel a
      WHERE createat = (
        SELECT MAX(createat)
        FROM basinwaterlevel b
        WHERE b.station_code = a.station_code
      )
      ORDER BY a.createat DESC
    `)
    return result.rows
  } catch (error) {
    return { error: 'Database error', details: error }
  }
})
