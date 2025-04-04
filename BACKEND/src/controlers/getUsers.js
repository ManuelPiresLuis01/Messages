import db from "../models/db.js";

const getAllUsers = async (req, res) => {
  try {
    db.query('SELECT nome,id FROM usuarios', (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
      res.status(200).json({ usuarios: result });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};

export default getAllUsers;