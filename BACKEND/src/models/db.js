import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const db= mysql.createConnection("mysql://root:SRcbBobVheyvSHWrCgSUgiQysLizbqIV@turntable.proxy.rlwy.net:52898/railway");

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
  } else {
    console.log('✅ Conectado com sucesso ao MySQL Railway!');
  }
});

export default db;
