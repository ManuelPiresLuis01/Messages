import db from "../models/db.js";

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        db.query('SELECT nome, email FROM usuarios WHERE id = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar usuário' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ usuario: result[0] });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
}

export default getUserById
