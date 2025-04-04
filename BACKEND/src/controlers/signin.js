import db from "../models/db.js";
import jwt from "jsonwebtoken";
import { comparePasswords } from "../SERVICES/authservice.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.TOKEN_SECRET;

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query('SELECT id, email, password_hash FROM usuarios WHERE email = ?', [email], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Email ou password errada' });
      }
  
      const user = result[0];
      const isMatch = await comparePasswords(password, user.password_hash); // ✅ agora com await
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Email ou password errada' });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: '1d' }
      );
  
      return res.status(200).json({ message: 'Usuário logado com sucesso', token });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
  };
  

export default signin;
