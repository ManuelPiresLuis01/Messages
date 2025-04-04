import db from "../models/db.js";
import { hashPassword } from "../SERVICES/authservice.js";


const Signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        db.query('SELECT id FROM usuarios WHERE email = ?', [email], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor banco' });
            }
            if (result.length > 0) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }
            const hash = hashPassword(password)
            if (!hash) {
                return res.status(500)
            }
            db.query('INSERT INTO `usuarios` (`username`, `email`, `password_hash`, `created_at`) VALUES (?, ?, ?, current_timestamp())',
                [username, email, hash], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erro no servidor ' });
                    }
                    res.status(201).json({ message: 'Usuário criado com sucesso', id: result.insertId, username, email });
                });
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
};

export default Signup
