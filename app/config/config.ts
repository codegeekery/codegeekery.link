import { Client } from 'pg'

const database = new Client({
    connectionString: process.env.DATABASE_URL!,
})

database.connect().catch((err) => {
    console.error('Error connecting to the database', err.stack)
})

export const sql = database