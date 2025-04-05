import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const db= mysql.createConnection(process.env.DB_URL);

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
  } else {
    console.log('✅ Conectado com sucesso ao MySQL Railway!');
  }
});
