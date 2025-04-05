import db from "../models/db.js";

const getAllUsers = async (req, res) => {
  try {
    const { id } = req.user; // ID do usuário logado

    const query = 'SELECT nome, id FROM usuarios WHERE id != ?';

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erro ao buscar usuários:', err);
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
      }

      res.status(200).json({ usuarios: result });
    });

  } catch (err) {
    console.error('Erro inesperado:', err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};

export default getAllUsers;
