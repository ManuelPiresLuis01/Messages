import db from "../models/db.js";

const getUserChats = (req, res) => {
  try {
    const { id } = req.user; // ID do usuário logado

    const query = `
      SELECT 
        u.id AS usuario_id,
        u.nome AS nome_usuario_conversa,
        c.created_at
      FROM chats c
      JOIN chat_usuarios cu1 ON cu1.chat_id = c.id
      JOIN chat_usuarios cu2 ON cu2.chat_id = c.id
      JOIN usuarios u ON u.id = cu2.usuario_id
      WHERE cu1.usuario_id = ?      -- usuário logado
        AND cu2.usuario_id != ?     -- outro usuário
      ORDER BY c.created_at DESC
    `;

    db.query(query, [id, id], (err, results) => {
      if (err) {
        console.error("Erro ao consultar o banco de dados:", err);
        return res.status(500).json({ message: "Erro no servidor" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Nenhum chat encontrado para o usuário" });
      }

      res.json({ chats: results });
    });

  } catch (error) {
    console.error("Erro inesperado:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export default getUserChats;
