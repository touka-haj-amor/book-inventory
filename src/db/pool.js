import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const {Pool} = pkg;

const poolConfig = process.env.DATABASE_URl ? {
    connectionString: process.env.DATABASE_URL
}
:{
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}

const pool = new Pool(poolConfig);

export default pool;