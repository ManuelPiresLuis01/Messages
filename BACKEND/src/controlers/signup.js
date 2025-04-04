import db from "../models/db.js";
import { hashPassword } from "../SERVICES/authservice.js";
// Controller de Cadastro
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar se o usuário já existe
        db.query('SELECT id FROM usuarios WHERE email = ?', [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor banco' });
            }
            if (result.length > 0) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }

            // Criptografar a senha
            const passwordHash = await hashPassword(password);
            console.log(passwordHash);
            // Inserir o usuário no banco de dados
            db.query('INSERT INTO usuarios (nome, email, password_hash, created_at) VALUES (?, ?, ?, current_timestamp())',
                [name, email, passwordHash], (err, result) => {
                    if (err) {
                        console.log('Erro ao executar a consulta:', err);
                        return res.status(500).json({ error: 'Erro ao criar usuário' });
                    }
                    res.status(201).json({ message: 'Usuário criado com sucesso', id: result.insertId, name, email });
                });
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
};


export default signup
