import db from "../models/db.js";

const searchUsersByName = async (req, res) => {
  try {
    const { id } = req.user;
    const { nome } = req.params;

    if (!nome) {
      return res.status(400).json({ error: "'nome' é obrigatório na busca." });
    }

    const searchTerm = `%${nome}%`;

    const query = `
      SELECT id, nome
      FROM usuarios
      WHERE nome LIKE ? AND id != ?
    `;

    db.query(query, [searchTerm, id], (err, results) => {
      if (err) {
        console.error("Erro ao buscar usuários:", err);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
      }

      res.status(200).json({ usuarios: results });
    });

  } catch (err) {
    console.error("Erro inesperado:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export default searchUsersByName;
