import mysql from "mysql2"
import  dotenv from "dotenv"

dotenv.config();


const db = mysql.createConnection(process.env.URL_DB);

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
    return;
  }
});

export default db;
