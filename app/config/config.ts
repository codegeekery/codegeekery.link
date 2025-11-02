import { Client } from 'pg'

const database = new Client({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false, // SSL sin verificación estricta del certificado
  },
})

database.connect().catch((err) => {
  console.error('Error connecting to the database:', err.stack)
})

export const sql = database

