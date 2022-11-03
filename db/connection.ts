import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;
const dbHost = process.env.DB_HOST as string;
const dbPort = process.env.DB_PORT as string;
const dbDriver = process.env.DB_DRIVER as Dialect;

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDriver,
  port: Number(dbPort),
  // logging: false
});

export default db;