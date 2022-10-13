import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export default mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'password',
});
