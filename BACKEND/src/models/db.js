import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,   // Espera por conexões disponíveis se o pool estiver ocupado
  connectionLimit: 10,        // Número máximo de conexões simultâneas
  queueLimit: 0               // Não há limite para o número de requisições na fila
});

db.connect((err) => {
  if (err) {
    console.error('Erro na conexão:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

export default db;
